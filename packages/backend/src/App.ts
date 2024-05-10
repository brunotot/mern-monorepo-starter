import express from "express";
import swaggerUi from "swagger-ui-express";
import { MongoClient, type MongoClientOptions } from "mongodb";
import { generateOpenApi } from "@ts-rest/open-api";
import { initServer, createExpressEndpoints } from "@ts-rest/express";

import { RouterCollection, Environment, Logger } from "@org/backend/config";
import { GLOBAL_MIDDLEWARES } from "@org/backend/infrastructure";
import { CONTRACTS, operationMapper, suppressConsole } from "@org/shared";

export type MongoConnectParams = {
  uri: string;
  options?: MongoClientOptions;
};

export type AppOptions = {
  mongoConnection: MongoConnectParamsFactory;
};

export type MongoConnectParamsFactory = () => Promise<MongoConnectParams>;

export class App {
  public readonly app: express.Application;
  public readonly env: string;
  public readonly port: string;
  public readonly swaggerPath: string;
  public readonly url: string;

  #mongoConnection: MongoConnectParamsFactory;

  private environment = Environment.getInstance();
  private logger = Logger.getInstance();
  mongoClient: MongoClient;

  constructor(options: AppOptions) {
    this.app = express();
    this.env = this.environment.vars.NODE_ENV;
    this.port = this.environment.vars.PORT;
    this.swaggerPath = "api-docs";
    this.#mongoConnection = options.mongoConnection;
    const domain =
      this.env === "production"
        ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
        : "http://localhost";
    this.url = `${domain}:${this.port}`;

    this.#initializeGlobalMiddlewares();
    this.#initializeRoutes();
    this.#initializeSwagger();
  }

  public async listen(): Promise<void> {
    await this.#initializeDatabase();
    return new Promise(resolve => {
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
        resolve();
      });
    });
  }

  async #initializeDatabase() {
    try {
      const { uri, options } = await this.#mongoConnection();
      this.mongoClient = new MongoClient(uri, options);
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
