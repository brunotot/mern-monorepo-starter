/**
 * @packageDocumentation
 *
 * ## Overview
 * The `ExpressApp` class serves as the main class responsible for configuring and running an Express-based server.
 * It handles the initialization of key components such as middleware, IoC modules, routes, and Swagger documentation.
 * Additionally, it manages the MongoDB connection and provides detailed logging throughout the application lifecycle.
 * This class provides the foundation for running and managing the server, making it extensible and configurable.
 *
 * ## Features
 * - **Middleware Setup**: Supports adding and managing global middleware.
 * - **IoC Module Integration**: Automatically scans and loads IoC (Inversion of Control) modules for dependency injection.
 * - **MongoDB Integration**: Establishes a connection to MongoDB and injects the client into the server lifecycle.
 * - **Swagger Documentation**: Integrates Swagger for API documentation, configured via environment variables.
 * - **Global Error Handling**: Implements a global error handler to catch and log errors gracefully.
 * - **Server Information Logging**: Logs detailed information about the server's environment, such as Node.js version, memory usage, and startup time.
 *
 * ## How to Use
 *
 * To create and initialize an `ExpressApp` instance:
 *
 * ```ts
 * import { ExpressApp } from "@org/app-node-express/ExpressApp";
 *
 * const app = new ExpressApp();
 *
 * await app.init();
 * await app.startListening();
 * ```
 *
 * You can also pass custom middleware and IoC modules during instantiation:
 *
 * ```ts
 * const app = new ExpressApp({
 *   middleware: [customMiddleware1, customMiddleware2],
 *   modules: { CustomModule: CustomModuleClass },
 * });
 * ```
 *
 * To execute additional logic when the app is fully initialized, use the `onReady` callback in the `init` method:
 *
 * ```ts
 * await app.init({}, (app) => {
 *   console.log('App is fully initialized and ready!');
 * });
 * ```
 *
 * ## Key Methods and Components
 *
 * - **init**: Initializes the server by loading middleware, routes, IoC modules, and connecting to MongoDB.
 * - **startListening**: Starts the server and begins listening for incoming HTTP requests on the configured port.
 * - **#initializeDatabase**: Establishes the connection to MongoDB using `MongoDatabaseService`.
 * - **#initializeIoc**: Configures and loads Inversion of Control (IoC) modules for dependency injection.
 * - **#initializeGlobalMiddlewares**: Adds global middleware to the Express app.
 * - **#initializeSwagger**: Integrates Swagger for API documentation.
 * - **#initializeErrorHandlerMiddleware**: Sets up the global error handler for catching and logging application errors.
 * - **#logTable**: Logs a table of detailed server information (Node.js version, memory usage, PID, etc.) when the server starts.
 *
 * ## Customization
 * - **Middleware**: Add or override global middleware by passing an array of middleware functions to the `ExpressApp` constructor.
 * - **IoC Modules**: Inject custom services or modules by passing them to the `modules` option when initializing the `ExpressApp`.
 * - **Mocking Services**: During testing, you can mock services and modules by passing a `mocks` object to the `init` method.
 * - **Error Handling**: Customize error handling by extending or modifying the `#initializeErrorHandlerMiddleware` method.
 *
 * ## Example Usage
 *
 * ```ts
 * import { ExpressApp } from "@org/app-node-express/ExpressApp";
 *
 * const app = new ExpressApp({
 *   middleware: [myCustomMiddleware],
 *   modules: { MyService: MyServiceClass },
 * });
 *
 * await app.init();
 * await app.startListening();
 * ```
 *
 * The server will automatically load Swagger documentation and connect to MongoDB. Any errors during startup will be logged, and the process will exit gracefully if critical issues occur.
 *
 * @module ExpressApp
 */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { MongoClient } from "@org/app-node-express/lib/mongodb";
import type { NoArgsClass } from "@org/lib-commons";

import { env } from "@org/app-node-express/env";
import { initializeExpressRoutes, initializeSwagger } from "@org/app-node-express/lib/@ts-rest";
import { IocRegistry } from "@org/app-node-express/lib/bottlejs";
import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb";
import { log, logBanner } from "@org/app-node-express/lib/winston";
import { getTypedError } from "@org/lib-api-client";
import express from "express";

export type ExpressAppConfig = Partial<{
  middleware: RouteMiddlewareFactory[];
  modules: Record<string, NoArgsClass>;
}>;

export class ExpressApp {
  public readonly expressApp: express.Application;
  public readonly port: number;
  public readonly url: string;
  public readonly keycloakUrl: string;
  public readonly middleware: RouteMiddlewareFactory[];
  public readonly modules: Record<string, NoArgsClass>;

  #mongoClient: MongoClient;
  #mockModules: Record<string, NoArgsClass>;

  constructor(config: ExpressAppConfig = {}) {
    this.middleware = config.middleware ?? [];
    this.modules = config.modules ?? {};
    this.expressApp = express();
    this.keycloakUrl = env.KEYCLOAK_URL;
    this.port = env.SERVER_PORT;
    this.url = env.SERVER_URL;
  }

  public get mockModules() {
    return this.#mockModules;
  }

  public get mongoClient(): MongoClient {
    return this.#mongoClient;
  }

  private get memoryUsage() {
    return `${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB`;
  }

  public async init(mocks: Record<string, NoArgsClass> = {}): Promise<void> {
    log.info("Initializing Swagger");
    this.#initializeSwagger();
    log.info("Initializing IoC container");
    this.#initializeIoc(mocks);
    log.info(`Initializing global middleware (${this.middleware.length})`);
    this.#initializeGlobalMiddlewares();
    log.info("Initializing routes");
    this.#initializeExpressRoutes();
    log.info("Initializing global error handler");
    this.#initializeErrorHandlerMiddleware();
    log.info("Connecting to database");
    await this.#initializeDatabase();
    log.info("App successfully initialized!");
  }

  public startListening(): void {
    log.info("Server connecting...");
    this.expressApp.listen(this.port, () => {
      logBanner({
        title: `[Express] ${env.SERVER_NAME} v${env.SERVER_VERSION}`,
        data: {
          "🟢 NodeJS": process.version,
          "🏠 Env": env.SERVER_ENV,
          "🔑 Keycloak": this.keycloakUrl,
          "📝 Swagger": env.TS_REST_SWAGGER_ENDPOINT,
          "🆔 PID": `${process.pid}`,
          "🧠 Memory": this.memoryUsage,
          "📅 Started": new Date().toLocaleString(),
        },
      });
      log.info(`🚀 Server listening on port ${this.port}`);
    });
  }

  async #initializeDatabase() {
    this.#mongoClient = MongoDatabaseService.buildMongoClient();
    await this.#mongoClient.connect();
    MongoDatabaseService.getInstance().client = this.#mongoClient;
  }

  #initializeIoc(mocks: Record<string, NoArgsClass>) {
    this.#mockModules = mocks;
    const modules = this.modules;
    const localModules: Record<string, NoArgsClass> = {};
    Object.entries(modules).forEach(([key, value]) => (localModules[key.toLowerCase()] = value));
    Object.entries(mocks).forEach(([key, value]) => (localModules[key.toLowerCase()] = value));
    IocRegistry.getInstance().iocStartup(localModules);
  }

  #initializeGlobalMiddlewares() {
    this.middleware.forEach(middlewareFactory => {
      this.expressApp.use(middlewareFactory());
    });
  }

  #initializeExpressRoutes() {
    initializeExpressRoutes(this.expressApp);
  }

  #initializeSwagger() {
    initializeSwagger({
      app: this.expressApp,
      oauth2RedirectUrl: `${this.url}${env.TS_REST_SWAGGER_ENDPOINT}${env.TS_REST_SWAGGER_OAUTH2_REDIRECT_ENDPOINT}`,
      version: env.SERVER_VERSION,
      endpoint: env.TS_REST_SWAGGER_ENDPOINT,
      cssPath: env.TS_REST_SWAGGER_CSS_PATH,
      jsPath: env.TS_REST_SWAGGER_JS_PATH,
    });
  }

  #initializeErrorHandlerMiddleware() {
    const errorHandler: express.ErrorRequestHandler = (error: unknown, req, res, next) => {
      if (res.headersSent) return next(error);
      const err = getTypedError(error);
      log.warn(`Headers sent before reaching main error handler`, err);
      res.status(err.content.status).json(err.content);
    };
    this.expressApp.use(errorHandler);
  }
}
