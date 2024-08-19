import express from "express";
import swaggerUi from "swagger-ui-express";
import { MongoClient, type MongoClientOptions } from "mongodb";
import { generateOpenApi } from "@ts-rest/open-api";
import { initServer, createExpressEndpoints } from "@ts-rest/express";

import { GLOBAL_MIDDLEWARES } from "@org/backend/infrastructure/middleware/global";
import { CONTRACTS, operationMapper, suppressConsole } from "@org/shared";
import { Environment } from "@org/backend/config/singletons/Environment";
import { Logger } from "@org/backend/config/singletons/Logger";
import { RouterCollection } from "./config/singletons/RouterCollection";
import { ServiceRegistry } from "./config/singletons/ServiceRegistry";
import MODULES from "./modules";
import keycloak from "./keycloak";

export class App {
  public readonly expressApp: express.Application;
  public readonly env: string;
  public readonly port: string;
  public readonly swaggerPath: string;
  public readonly url: string;

  private environment = Environment.getInstance();
  private logger = Logger.getInstance();
  mongoClient: MongoClient;

  constructor() {
    this.expressApp = express();
    this.env = this.environment.vars.NODE_ENV;
    this.port = this.environment.vars.PORT;
    this.swaggerPath = "api-docs";
    const domain =
      this.env === "production"
        ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
        : "http://localhost";
    this.url = `${domain}:${this.port}`;
    this.#initializeGlobalMiddlewares();
    this.#initializeRoutes();
    this.#initializeSwagger();
  }

  public async prepare(): Promise<void> {
    ServiceRegistry.getInstance().iocStartup(MODULES);
    await this.#initializeDatabase();
  }

  public async start(): Promise<void> {
    return new Promise(resolve => {
      this.expressApp.listen(this.port, () => {
        this.logger.table({
          title: `[Express] MERN Sample App v${this.environment.vars.PACKAGE_JSON_VERSION}`,
          data: {
            "🟢 NodeJS": process.version,
            "🏠 Env": this.env,
            "📝 Swagger": `/${this.swaggerPath}`,
            "🆔 PID": `${process.pid}`,
            "🧠 Memory": `${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB`,
            "📅 Started": new Date().toLocaleString(),
          },
        });
        this.logger.logger.info(`🚀 App listening on port ${this.port}`);
        resolve();
      });
    });
  }

  async #initializeDatabase() {
    try {
      const { MONGO_URL } = Environment.getInstance().vars;
      const MONGO_OPTIONS: MongoClientOptions = {};
      this.mongoClient = new MongoClient(MONGO_URL, MONGO_OPTIONS);
      await this.mongoClient.connect();
    } catch (error) {
      console.log(error);
    }
  }

  #initializeGlobalMiddlewares() {
    this.expressApp.use(keycloak.middleware());
    GLOBAL_MIDDLEWARES.forEach(middleware => {
      this.expressApp.use(middleware);
    });
  }

  #initializeRoutes() {
    const s = initServer();
    const router = s.router(CONTRACTS, RouterCollection.getInstance().getRouters());
    suppressConsole(() => createExpressEndpoints(CONTRACTS, router, this.expressApp));
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

    this.expressApp.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(openApiDocument, {
        customCssUrl: "/css/swagger.css",
      }),
    );
  }
}
