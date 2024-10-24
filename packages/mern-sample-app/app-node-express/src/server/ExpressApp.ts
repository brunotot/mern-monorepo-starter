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
 * ### Imports
 *
 * ```ts
 * import { ExpressApp } from "@org/app-node-express/ExpressApp";
 * ```
 *
 * ### Create and initialize an `ExpressApp` instance
 *
 * ```ts
 * const app = new ExpressApp();
 * await app.init();
 * app.startListening();
 * ```
 *
 * ### Pass custom middleware and IoC modules during instantiation
 *
 * ```ts
 * const app = new ExpressApp({
 *   middleware: [customMiddleware1, customMiddleware2],
 *   modules: { CustomModule: CustomModuleClass },
 * });
 * ```
 */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { MongoClient } from "@org/app-node-express/lib/mongodb";
import type { NoArgsClass } from "@org/lib-commons";
import type { IncomingMessage, Server, ServerResponse } from "http";

import {
  initializeExpressRoutes,
  initializeSwagger,
  TsRestRouterService,
} from "@org/app-node-express/lib/@ts-rest";
import { IocRegistry } from "@org/app-node-express/lib/ioc";
import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb";
import { log, logBanner } from "@org/app-node-express/lib/winston";
import { env } from "@org/app-node-express/server/env";
import { getTypedError } from "@org/lib-api-client";
import express from "express";

export type ExpressAppConfig = Partial<{
  middleware: RouteMiddlewareFactory[];
  modules: Record<string, NoArgsClass>;
}>;

export class ExpressApp {
  public readonly expressApp: express.Application;
  public readonly port: number;
  public readonly keycloakUrl: string;
  public readonly middleware: RouteMiddlewareFactory[];
  public readonly modules: Record<string, NoArgsClass>;

  #url: string;
  #mongoClient: MongoClient;
  #mockModules: Record<string, NoArgsClass>;
  #httpServer: Server<typeof IncomingMessage, typeof ServerResponse>;

  constructor(config: ExpressAppConfig = {}) {
    this.middleware = config.middleware ?? [];
    this.modules = config.modules ?? {};
    this.expressApp = express();
    this.keycloakUrl = env.KEYCLOAK_URL;
    this.port = env.SERVER_PORT;
    this.#url = env.SERVER_URL;
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
    log.info(`Initializing routes (${TsRestRouterService.getInstance().getTotalRouteCount()})`);
    this.#initializeExpressRoutes();
    log.info("Initializing global error handler");
    this.#initializeErrorHandlerMiddleware();
    log.info("Connecting to database");
    await this.#initializeDatabase();
    log.info("App successfully initialized!");
  }

  public startListening(): void {
    log.info("Server connecting...");
    const port = Number(process.env.PORT || env.SERVER_PORT);
    //this.#httpServer = this.expressApp.listen(port, "0.0.0.0", () => {
    this.#httpServer = this.expressApp.listen(port, "::", () => {
      logBanner({
        title: `[Express] ${env.SERVER_NAME} v${env.SERVER_VERSION}`,
        data: {
          "🟢 NodeJS": process.version,
          "🏠 Env": env.SERVER_ENV,
          "🔑 Keycloak": this.keycloakUrl,
          "📝 Swagger": "/api-docs",
          "🆔 PID": `${process.pid}`,
          "🧠 Memory": this.memoryUsage,
          "📅 Started": new Date().toLocaleString(),
        },
      });
      log.info(`🚀 Server listening on port ${this.port}`);
    });

    const oneMinuteInMsec = 60 * 1000;
    this.#httpServer.setTimeout(env.SERVER_TIMEOUT_IN_MINS * oneMinuteInMsec);
    this.#httpServer.on("timeout", socket => {
      socket.destroy();
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
    TsRestRouterService.getInstance().validateAllRoutesToBeImplemented();
    initializeExpressRoutes(this.expressApp);
  }

  #initializeSwagger() {
    initializeSwagger({
      app: this.expressApp,
      oauth2RedirectUrl: `${this.#url}/api-docs${env.SWAGGER_OAUTH2_REDIRECT_ENDPOINT}`,
      oauth2AuthorizationUrl: `${env.KEYCLOAK_URL}/realms/${env.KEYCLOAK_REALM}/protocol/openid-connect${env.KEYCLOAK_LOGIN_ENDPOINT}`,
      oauth2TokenUrl: `${env.KEYCLOAK_URL}/realms/${env.KEYCLOAK_REALM}/protocol/openid-connect${env.KEYCLOAK_TOKEN_ENDPOINT}`,
      version: env.SERVER_VERSION,
      endpoint: "/api-docs",
      cssPath: env.SWAGGER_CSS_PATH,
      jsPath: env.SWAGGER_JS_PATH,
    });
  }

  #initializeErrorHandlerMiddleware() {
    const errorHandler: express.ErrorRequestHandler = (error: unknown, _req, res, next) => {
      const err = getTypedError(error);
      if (res.headersSent) {
        log.warn(`Headers sent before reaching main error handler`, err);
        return next(error);
      }
      res.status(err.content.status).json(err.content);
    };
    this.expressApp.use(errorHandler);
  }
}
