import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Router } from "express";
import helmet from "helmet";
import hpp from "hpp";
import { connect, set } from "mongoose";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { $BackendAppConfig } from "./config/BackendAppConfig";
import { logger, stream } from "./config/logger/logger";
import { swaggerSpec } from "./config/swagger";
import { getInjectionClasses } from "./decorators/Injectable";
import { RoutesMetaService } from "./meta/RoutesMetaService";
import { withCredentials } from "./middleware/withCredentials";
//import { ErrorMiddleware } from "@middlewares/error.middleware";

export class App {
  public app: express.Application;
  public env: string;
  public port: string;

  constructor() {
    this.app = express();
    this.env = $BackendAppConfig.env.NODE_ENV;
    this.port = $BackendAppConfig.env.PORT;

    this.databaseConnect();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
    //this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async databaseConnect() {
    const { dbHost, dbPort, dbName, ...restOptions } =
      $BackendAppConfig.databaseConnectionParams;
    const mongoUri = `mongodb://${dbHost}:${dbPort}`;
    if ($BackendAppConfig.env.NODE_ENV !== "production") set("debug", true);
    await connect(mongoUri, {
      dbName,
      ...restOptions,
    });
  }

  private initializeMiddlewares() {
    this.app.use(morgan($BackendAppConfig.env.LOG_FORMAT, { stream }));
    this.app.use(withCredentials());
    this.app.use(
      cors({
        origin: $BackendAppConfig.env.ORIGIN,
        credentials: $BackendAppConfig.env.CREDENTIALS === "true",
      })
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    //Should be specified at endpoint level.
    //this.app.use(verifyJWT());
  }

  private initializeRoutes() {
    getInjectionClasses().forEach((clazz) => {
      const router = Router();
      const { basePath, routes } = RoutesMetaService.from(clazz).value;
      routes.forEach(({ method, path = "", middlewares, handler }) => {
        const fullPath = `${basePath}${path}`;
        const pipeline = middlewares ? [...middlewares, handler] : [handler];
        router[method](fullPath, ...pipeline);
      });
      this.app.use("/", router);
    });
  }

  private initializeSwagger() {
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.get("/api-docs.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
    logger.info(`Docs available at http://localhost:${this.port}/api-docs`);
  }

  /*private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }*/
}
