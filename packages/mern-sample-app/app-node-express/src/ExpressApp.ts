/* eslint-disable no-console */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { MongoClient } from "@org/app-node-express/lib/mongodb";
import type { NoArgsClass } from "@org/lib-commons";

import { env } from "@org/app-node-express/env";
import { initializeExpressRoutes, initializeSwagger } from "@org/app-node-express/lib/@ts-rest";
import { IocRegistry } from "@org/app-node-express/lib/bottlejs";
import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb";
import { log } from "@org/app-node-express/logger";
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

  public async init(
    mocks: Record<string, NoArgsClass> = {},
    onReady?: (app: ExpressApp) => void,
  ): Promise<void> {
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
    onReady?.(this);
  }

  public async startListening(): Promise<void> {
    return new Promise(resolve => {
      log.info("Server connecting...");
      this.expressApp.listen(this.port, () => {
        this.#logTable({
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
        log.info(`🚀 App listening on port ${this.port}`);
        resolve();
      });
    });
  }

  async #initializeDatabase() {
    this.#mongoClient = MongoDatabaseService.buildMongoClient();
    await this.#mongoClient.connect();
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

    const content = Object.entries(data).map(([key, value]) => {
      const keyPadding = " ".repeat(maxKeyLength - key.length);
      const text = `${key}${keyPadding}${hrY}${value}`;
      const remainder = " ".repeat(containerWidth - text.length - spacer.length * 2);
      return `│${spacer}${text}${remainder}${spacer}│`;
    });

    const hrX = `${"─".repeat(containerWidth)}`;
    console.info(`┌${hrX}┐`);
    console.info(`│${center(title, containerWidth)}│`);
    console.info(`├${hrX}┤`);
    content.forEach(text => console.info(text));
    console.info(`└${hrX}┘`);
  }
}
