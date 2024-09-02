import express, { type ErrorRequestHandler } from "express";
import { initServer, createExpressEndpoints } from "@ts-rest/express";
import { contracts, operationMapper } from "@org/lib-api-client";
import { getTypedError, type TODO } from "@org/lib-commons";
import { type MongoClient } from "mongodb";
import swaggerUi from "swagger-ui-express";
import { generateOpenApi } from "@ts-rest/open-api";

import { middleware as globalMiddleware } from "@org/app-node-express/setup/middleware.setup";
import { log } from "@org/app-node-express/setup/log.setup";
import { RouteCollection } from "@org/app-node-express/config/Route.config";
import { env } from "@org/app-node-express/setup/env.setup";
import { iocRegistry } from "@org/app-node-express/setup/registry.setup";

import { KeycloakAuthorization } from "@org/app-node-express/infrastructure/security/KeycloakAuthorization";
import { UserController } from "@org/app-node-express/infrastructure/controllers/UserController";
import { UserRepository } from "@org/app-node-express/infrastructure/repository/impl/UserRepository";
import { KeycloakRepository } from "@org/app-node-express/infrastructure/repository/impl/KeycloakRepository";
import { ErrorLogRepository } from "@org/app-node-express/infrastructure/repository/impl/ErrorLogRepository";
import { UserService } from "@org/app-node-express/infrastructure/service/UserService";
import { buildMongoClient } from "./config/MongoDB.config";

function getModules() {
  return {
    Authorization: KeycloakAuthorization,
    UserController,
    UserRepository,
    ErrorLogRepository,
    UserService,
    AuthorizationRepository: KeycloakRepository,
  } as const satisfies Record<string, new () => TODO>;
}

export class ExpressApp {
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
    this.url = env.SERVER_URL;
  }

  public async init(mocks: Record<string, new () => TODO> = {}): Promise<void> {
    log.info("Initializing Swagger");
    this.#initializeSwagger();
    log.info("Initializing IoC container");
    this.#initializeIoc(mocks);
    log.info(`Initializing global middleware (${globalMiddleware.length})`);
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
    this.#mongoClient = buildMongoClient();
    await this.#mongoClient.connect();
  }

  #initializeErrorHandlerMiddleware() {
    const errorHandler: ErrorRequestHandler = (error: unknown, req, res, next) => {
      if (res.headersSent) return next(error);
      const err = getTypedError(error);
      log.warn(`Headers sent before reaching main error handler`, err);
      res.status(err.content.status).json(err.content);
    };
    this.expressApp.use(errorHandler);
  }

  #initializeIoc(mocks: Record<string, new () => TODO>) {
    const modules = getModules();
    const localModules: Record<string, new () => TODO> = {};
    Object.entries(modules).forEach(([key, value]) => (localModules[key.toLowerCase()] = value));
    Object.entries(mocks).forEach(([key, value]) => (localModules[key.toLowerCase()] = value));
    iocRegistry.iocStartup(localModules);
  }

  #initializeGlobalMiddlewares() {
    globalMiddleware.forEach(middlewareFactory => {
      this.expressApp.use(middlewareFactory());
    });
  }

  #initializeRoutes() {
    const s = initServer();
    const router = s.router(contracts, RouteCollection.getInstance().getRouters());
    function suppressConsole<T>(handler: () => T): T {
      const originalConsole = {
        log: console.log,
        warn: console.warn,
        error: console.error,
      };

      console.log = console.warn = console.error = function () {};

      try {
        return handler();
      } finally {
        console.log = originalConsole.log;
        console.warn = originalConsole.warn;
        console.error = originalConsole.error;
      }
    }
    suppressConsole(() => createExpressEndpoints(contracts, router, this.expressApp));
  }

  #initializeSwagger() {
    const swaggerConfig = {
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
        version: env.PACKAGE_JSON_VERSION,
        description: "This is a dynamically generated Swagger API documentation",
      },
      components: {
        securitySchemes: {
          Keycloak: {
            type: "oauth2",
            flows: {
              implicit: {
                authorizationUrl: `${env.KEYCLOAK_URL}${env.KEYCLOAK_AUTHORIZATION_ENDPOINT}`,
                scopes: {},
              },
            },
          },
        },
      },
      security: [
        {
          Keycloak: [],
        },
      ],
    };
    const openApiDocument = generateOpenApi(contracts, swaggerConfig, { operationMapper });

    this.expressApp.use(
      env.SWAGGER_ENDPOINT,
      swaggerUi.serve,
      swaggerUi.setup(openApiDocument, {
        swaggerOptions: {
          oauth2RedirectUrl: `${env.SERVER_URL}${env.SWAGGER_ENDPOINT}${env.SWAGGER_OAUTH2_REDIRECT_ENDPOINT}`,
        },
        customCssUrl: env.SWAGGER_CSS_PATH,
        customJs: env.SWAGGER_JS_PATH,
      }),
    );
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
