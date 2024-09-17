import express from "express";

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { Class } from "@org/lib-commons";
import type { MongoClient } from "@org/app-node-express/lib/mongodb";

import { initializeExpressRoutes, initializeSwagger } from "@org/app-node-express/lib/@ts-rest";
import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb";
import { getTypedError } from "@org/lib-api-client";
import { iocRegistry } from "@org/app-node-express/lib/bottlejs";
import { log } from "@org/app-node-express/logger";
import { env } from "@org/app-node-express/env";

export type ExpressAppConfig = Partial<{
  middleware: RouteMiddlewareFactory[];
  modules: Record<string, Class>;
}>;

export class ExpressApp {
  public readonly expressApp: express.Application;
  public readonly port: string;
  public readonly url: string;
  public readonly keycloakUrl?: string;
  public readonly middleware: RouteMiddlewareFactory[];
  public readonly modules: Record<string, Class>;

  #mongoClient: MongoClient;
  #mockModules: Record<string, Class>;

  constructor(config: ExpressAppConfig = {}) {
    this.middleware = config.middleware ?? [];
    this.modules = config.modules ?? {};
    this.expressApp = express();
    this.keycloakUrl = env.KEYCLOAK_URL;
    this.port = env.PORT;
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

  public async init(mocks: Record<string, Class> = {}): Promise<void> {
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

  public async startListening(): Promise<void> {
    return new Promise(resolve => {
      log.info("Server connecting...");
      this.expressApp.listen(this.port, () => {
        this.#logTable({
          title: `[Express] ${env.APP_NAME} v${env.PACKAGE_JSON_VERSION}`,
          data: {
            "🟢 NodeJS": process.version,
            "🏠 Env": env.NODE_ENV,
            "📝 Swagger": env.SWAGGER_ENDPOINT,
            "🆔 PID": `${process.pid}`,
            "🧠 Memory": this.memoryUsage,
            "📅 Started": new Date().toLocaleString(),
            "🔑 Keycloak": this.keycloakUrl ?? "-",
          },
        });
        log.info(`🚀 App listening on port ${this.port}`);
        resolve();
      });
    });
  }

  async #initializeDatabase() {
    this.#mongoClient = MongoDatabaseService.buildMongoClient();
    await this.#mongoClient.connect();
  }

  #initializeIoc(mocks: Record<string, Class>) {
    this.#mockModules = mocks;
    const modules = this.modules;
    const localModules: Record<string, Class> = {};
    Object.entries(modules).forEach(([key, value]) => (localModules[key.toLowerCase()] = value));
    Object.entries(mocks).forEach(([key, value]) => (localModules[key.toLowerCase()] = value));
    iocRegistry.iocStartup(localModules);
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
      oauth2RedirectUrl: `${this.url}${env.SWAGGER_ENDPOINT}${env.SWAGGER_OAUTH2_REDIRECT_ENDPOINT}`,
      version: env.PACKAGE_JSON_VERSION,
      endpoint: env.SWAGGER_ENDPOINT,
      cssPath: env.SWAGGER_CSS_PATH,
      jsPath: env.SWAGGER_JS_PATH,
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

  /**
   *
   * An example output might be:
   *
   * ```
   * ┌──────────────────────────────────────┐
   * │   [Express] app-node-express v0.0.1  │
   * ├──────────────────────────────────────┤
   * │  🟢 NodeJS  : v21.7.0                │
   * │  🏠 Env     : development            │
   * │  📝 Swagger : /api-docs              │
   * │  🆔 PID     : 61178                  │
   * │  🧠 Memory  : 24.65 MB               │
   * │  📅 Started : 8/19/2024, 7:40:59 PM  │
   * └──────────────────────────────────────┘
   * ```
   */
  #logTable(props: { title: string; data: Record<string, string> }) {
    const title = props.title;
    const data = props.data;
    const kvSeparator = " : ";
    const padding = 2;

    const center = (text: string, length: number) => {
      const remainingSpace = length - text.length;
      const leftBorderCount = Math.floor(remainingSpace / 2);
      const rightBorderCount = remainingSpace - leftBorderCount;
      const left = " ".repeat(leftBorderCount);
      const right = " ".repeat(rightBorderCount);
      return `${left}${text}${right}`;
    };

    const spacer = " ".repeat(padding);
    const hrY = kvSeparator;
    const maxKeyLength = Math.max(...Object.keys(data).map(key => key.length));

    const keyValueLengths = Object.values(data).map(
      value => maxKeyLength + hrY.length + value.length,
    );

    const containerWidth = Math.max(title.length, ...keyValueLengths) + padding * 2;

    const hrX = `${"─".repeat(containerWidth)}`;

    const content = Object.entries(data).map(([key, value]) => {
      const keyPadding = " ".repeat(maxKeyLength - key.length);
      const text = `${key}${keyPadding}${hrY}${value}`;
      const remainder = " ".repeat(containerWidth - text.length - spacer.length * 2);
      return `│${spacer}${text}${remainder}${spacer}│`;
    });

    console.info(`┌${hrX}┐`);
    console.info(`│${center(title, containerWidth)}│`);
    console.info(`├${hrX}┤`);
    content.forEach(text => console.info(text));
    console.info(`└${hrX}┘`);
  }
}
