import express from "express";

import {
  GLOBAL_MIDDLEWARES,
  VAR_ZOD_ENVIRONMENT,
  mongoConnect,
  registerRoutes,
  registerSwagger,
  startupLog,
} from "@internal";

export class App {
  public readonly app: express.Application;
  public readonly env: string;
  public readonly port: string;
  public readonly swaggerPath: string;
  public readonly url: string;

  constructor() {
    this.app = express();
    this.env = VAR_ZOD_ENVIRONMENT.NODE_ENV;
    this.port = VAR_ZOD_ENVIRONMENT.PORT;
    this.swaggerPath = "api-docs";
    function buildUrl() {
      const domain =
        VAR_ZOD_ENVIRONMENT.NODE_ENV === "production"
          ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
          : "http://localhost";

      return `${domain}:${VAR_ZOD_ENVIRONMENT.PORT}`;
    }
    this.url = buildUrl();

    this.#initializeDatabase();
    this.#initializeMiddlewares();
    this.#initializeRoutes();
    this.#initializeSwagger();
  }

  public listen() {
    this.app.listen(this.port, () => {
      startupLog({
        title: `[Express] MERN Sample App v${VAR_ZOD_ENVIRONMENT.PACKAGE_JSON_VERSION}`,
        data: {
          "🟢 NodeJS": process.version,
          "🏠 Env": this.env,
          "🚀 Port": this.port,
          "📝 Swagger": `/${this.swaggerPath}`,
          "🆔 PID": `${process.pid}`,
          "🧠 Memory": `${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB`,
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
}
