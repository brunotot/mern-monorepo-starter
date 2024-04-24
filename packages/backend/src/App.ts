import { Bottle, Environment, GLOBAL_MIDDLEWARES, Logger, MongoClient, Swagger } from "@internal";
import express from "express";

export class App {
  public readonly app: express.Application;
  public readonly env: string;
  public readonly port: string;
  public readonly swaggerPath: string;
  public readonly url: string;

  private environment = Environment.getInstance();
  private logger = Logger.getInstance();
  private mongoClient = MongoClient.getInstance();

  constructor() {
    Bottle.getInstance().iocStartup();

    this.app = express();
    this.env = this.environment.vars.NODE_ENV;
    this.port = this.environment.vars.PORT;
    this.swaggerPath = "api-docs";
    const domain =
      this.env === "production"
        ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
        : "http://localhost";
    this.url = `${domain}:${this.port}`;

    this.#initializeDatabase();
    this.#initializeGlobalMiddlewares();
    this.#initializeRoutes();
    this.#initializeSwagger();
  }

  public listen() {
    this.app.listen(this.port, () => {
      this.logger.table({
        title: `[Express] MERN Sample App v${this.environment.vars.PACKAGE_JSON_VERSION}`,
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
    try {
      await this.mongoClient.connect();
    } catch (error) {
      console.log(error);
    }
  }

  #initializeGlobalMiddlewares() {
    GLOBAL_MIDDLEWARES.forEach(middleware => this.app.use(middleware));
  }

  #initializeRoutes() {
    Bottle.getInstance().registerRoutes(this.app);
  }

  #initializeSwagger() {
    Swagger.getInstance().registerSwagger(this.app, this.swaggerPath);
  }
}
