import { $BackendAppConfig, mongoConnect, registerSwagger, startupLog } from "@config";
import { registerRoutes } from "@decorators";
import { GLOBAL_MIDDLEWARES } from "@infrastructure";
import express from "express";

export class App {
  public readonly app: express.Application;
  public readonly env: string;
  public readonly port: string;
  public readonly swaggerPath: string;
  public readonly url: string;

  constructor() {
    this.#initializeUncaughtExceptionHandler();

    this.app = express();
    this.env = $BackendAppConfig.env.NODE_ENV;
    this.port = $BackendAppConfig.env.PORT;
    this.swaggerPath = "api-docs";
    this.url = $BackendAppConfig.url;

    this.#initializeDatabase();
    this.#initializeMiddlewares();
    this.#initializeRoutes();
    this.#initializeSwagger();
  }

  public listen() {
    this.app.listen(this.port, () => {
      startupLog({
        title: `[Express] MERN Sample App v${$BackendAppConfig.env.PACKAGE_JSON_VERSION}`,
        data: {
          "🟢 NodeJS": process.version,
          "📦 Database": $BackendAppConfig.databaseConnectionParams.dbName,
          "🚀 App": this.url,
          "📝 Swagger": `${this.url}/${this.swaggerPath}`,
          "🆔 PID": `${process.pid}`,
          "🧠 Memory": `${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB`,
          "🏠 Env": this.env,
          "📅 Started": new Date().toLocaleString(),
        },
      });
    });
  }

  async #initializeDatabase() {
    await mongoConnect();
  }

  #initializeMiddlewares() {
    GLOBAL_MIDDLEWARES.forEach(middleware => this.app.use(middleware));
  }

  #initializeRoutes() {
    registerRoutes(this.app);
  }

  #initializeSwagger() {
    registerSwagger(this.app, this.swaggerPath);
  }

  #initializeUncaughtExceptionHandler() {
    process.on("uncaughtException", err => {
      console.error("Uncaught Exception:", err);
    });
  }
}
