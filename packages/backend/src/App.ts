import express from "express";
import * as swaggerUi from "swagger-ui-express";
import { type MongoClient as MongoClientNative } from "mongodb";
import { RouterCollection, Environment, Logger } from "@org/backend/config";
import { GLOBAL_MIDDLEWARES } from "@org/backend/infrastructure";
import { CONTRACTS, operationMapper, suppressConsole } from "@org/shared";
import { generateOpenApi } from "@ts-rest/open-api";
import { initServer, createExpressEndpoints } from "@ts-rest/express";

export class App {
  public readonly app: express.Application;
  public readonly env: string;
  public readonly port: string;
  public readonly swaggerPath: string;
  public readonly url: string;

  private environment = Environment.getInstance();
  private logger = Logger.getInstance();
  private mongoClient: MongoClientNative;

  constructor(mongoClient: MongoClientNative) {
    this.app = express();
    this.env = this.environment.vars.NODE_ENV;
    this.port = this.environment.vars.PORT;
    this.swaggerPath = "api-docs";
    this.mongoClient = mongoClient;
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
    const s = initServer();
    const router = s.router(CONTRACTS, RouterCollection.getInstance().getRouters());
    suppressConsole(() => createExpressEndpoints(CONTRACTS, router, this.app));
  }

  #initializeSwagger() {
    const apiDoc: Parameters<typeof generateOpenApi>[1] = {
      info: {
        title: "REST API",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        termsOfService: "http://swagger.io/terms/",
        contact: {
          email: "",
          name: "",
          url: "",
        },
        version: Environment.getInstance().vars.PACKAGE_JSON_VERSION,
        description: "This is a dynamically generated Swagger API documentation",
      },
    };

    const openApiDocument = generateOpenApi(CONTRACTS, apiDoc, { operationMapper });

    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(openApiDocument, {
        customCssUrl: "/css/swagger.css",
      }),
    );
  }
}
