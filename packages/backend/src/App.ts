import express, { type ErrorRequestHandler } from "express";
import { initServer, createExpressEndpoints } from "@ts-rest/express";
import { CONTRACTS, type ErrorResponse, suppressConsole } from "@org/shared";
import { MongoClient } from "mongodb";

import { GLOBAL_MIDDLEWARES } from "@org/backend/infrastructure/middleware/global";
import { log, logTable } from "@org/backend/config/singletons/Logger";
import { RouterCollection } from "@org/backend/config/singletons/RouterCollection";
import { ServiceRegistry } from "@org/backend/config/singletons/ServiceRegistry";
import { env, SERVER_URL } from "@org/backend/config/singletons/Environment";
import { applySwaggerMiddleware, SWAGGER_PATH } from "@org/backend/swagger";
import MODULES, { type NoArgsClass } from "@org/backend/modules";

export class App {
  public readonly expressApp: express.Application;
  public readonly port: string;
  public readonly url: string;
  public readonly keycloakUrl?: string;

  public get mongoClient(): MongoClient {
    return this.#mongoClient;
  }

  #mongoClient: MongoClient;

  private get memoryUsage() {
    return `${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB`;
  }

  constructor() {
    this.expressApp = express();
    this.keycloakUrl = env.KEYCLOAK_URL;
    this.port = env.PORT;
    this.url = SERVER_URL;
    log.info("Applying Swagger middleware");
    applySwaggerMiddleware(this.expressApp);
  }

  public async init(mocks: Record<string, NoArgsClass> = {}): Promise<void> {
    log.info("Initializing IoC container");
    this.#initializeIoc(mocks);
    log.info(`Initializing global middleware (${GLOBAL_MIDDLEWARES.length})`);
    this.#initializeGlobalMiddlewares();
    log.info("Initializing routes");
    this.#initializeRoutes();
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
        logTable({
          title: `[Express] ${env.APP_NAME} v${env.PACKAGE_JSON_VERSION}`,
          data: {
            "🟢 NodeJS": process.version,
            "🏠 Env": env.NODE_ENV,
            "📝 Swagger": SWAGGER_PATH,
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
    this.#mongoClient = new MongoClient(env.MONGO_URL, {});
    await this.#mongoClient.connect();
  }

  #initializeErrorHandlerMiddleware() {
    const errorHandler: ErrorRequestHandler = (err: ErrorResponse, req, res, next) => {
      if (res.headersSent) return next(err);
      log.warn(`Headers sent before reaching main error handler`, err);
      res.status(err.content.status).json(err.content);
    };
    this.expressApp.use(errorHandler);
  }

  #initializeIoc(mocks: Record<string, NoArgsClass>) {
    const modules: Record<string, NoArgsClass> = {};
    Object.entries(MODULES).forEach(([key, value]) => (modules[key.toLowerCase()] = value));
    Object.entries(mocks).forEach(([key, value]) => (modules[key.toLowerCase()] = value));
    ServiceRegistry.getInstance().iocStartup(modules);
  }

  #initializeGlobalMiddlewares() {
    GLOBAL_MIDDLEWARES.forEach(middlewareFactory => {
      this.expressApp.use(middlewareFactory());
    });
  }

  #initializeRoutes() {
    const s = initServer();
    const router = s.router(CONTRACTS, RouterCollection.getInstance().getRouters());
    suppressConsole(() => createExpressEndpoints(CONTRACTS, router, this.expressApp));
  }
}
