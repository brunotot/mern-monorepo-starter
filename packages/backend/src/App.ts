import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Router } from "express";
import helmet from "helmet";
import hpp from "hpp";
import { connect, set } from "mongoose";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { $BackendAppConfig, startupLog, stream } from "./config";
import { $SwaggerManager } from "./config/swagger";
import { getInjectionClasses } from "./decorators/@Injectable";
import { RoutesMetaService } from "./meta/RoutesMetaService";
import { withAugmentedResponse } from "./middleware/withAugmentedResponse";
import { withCredentials } from "./middleware/withCredentials";
//import { ErrorMiddleware } from "@middlewares/error.middleware";

export class App {
  public app: express.Application;
  public env: string;
  public port: string;
  public swaggerPath: string;
  public url: string;

  constructor() {
    this.app = express();
    this.env = $BackendAppConfig.env.NODE_ENV;
    this.port = $BackendAppConfig.env.PORT;
    this.swaggerPath = "api-docs";
    this.url = `http://localhost:${this.port}`;

    this.databaseConnect();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
    //this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      startupLog({
        title: "Express app started!",
        data: {
          "🏠 Env": this.env,
          "🚀 App": this.url,
          "📝 Swagger": `${this.url}/${this.swaggerPath}`,
        },
      });
    });
  }

  public getServer() {
    return this.app;
  }

  private async databaseConnect() {
    const { dbHost, dbPort, dbName, ...restOptions } = $BackendAppConfig.databaseConnectionParams;
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
      }),
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(withAugmentedResponse());
    //Should be specified at endpoint level.
    //this.app.use(verifyJWT());
  }

  private initializeRoutes() {
    getInjectionClasses().forEach(clazz => {
      const router = Router();
      const { basePath, routes } = RoutesMetaService.from(clazz).value;
      routes.forEach(({ method, path = "", middlewares, handler }) => {
        const fullPath = `${basePath}${path}`;
        const pipeline = middlewares ? [...middlewares, handler] : [handler];
        // @ts-expect-error Unknown
        router[method](fullPath, ...pipeline);
      });
      this.app.use("/", router);
    });
  }

  private initializeSwagger() {
    const swaggerSpec = $SwaggerManager.buildSpec();
    this.app.use(`/${this.swaggerPath}`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.get(`/${this.swaggerPath}.json`, (_req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
  }

  /*private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }*/
}
