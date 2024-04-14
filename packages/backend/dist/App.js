var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Router } from "express";
import helmet from "helmet";
import hpp from "hpp";
import { connect, set } from "mongoose";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { $BackendAppConfig } from "./config/BackendAppConfig";
import { getInjectionClasses } from "./decorators/Injectable";
import { RoutesMetaService } from "./meta/RoutesMetaService";
import { credentials } from "./middleware/credentials";
import { logger, stream } from "./utils/logger";
//import { ErrorMiddleware } from "@middlewares/error.middleware";
export class App {
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
    listen() {
        this.app.listen(this.port, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    databaseConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = $BackendAppConfig.databaseConnectionParams, { dbHost, dbPort, dbName } = _a, restOptions = __rest(_a, ["dbHost", "dbPort", "dbName"]);
            const mongoUri = `mongodb://${dbHost}:${dbPort}`;
            if ($BackendAppConfig.env.NODE_ENV !== "production")
                set("debug", true);
            yield connect(mongoUri, Object.assign({ dbName }, restOptions));
        });
    }
    initializeMiddlewares() {
        this.app.use(morgan($BackendAppConfig.env.LOG_FORMAT, { stream }));
        this.app.use(credentials());
        this.app.use(cors({
            origin: $BackendAppConfig.env.ORIGIN,
            credentials: $BackendAppConfig.env.CREDENTIALS === "true",
        }));
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        //Should be specified at endpoint level.
        //this.app.use(verifyJWT());
    }
    initializeRoutes() {
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
    initializeSwagger() {
        const specs = swaggerJSDoc({
            swaggerDefinition: {
                openapi: "3.0.0",
                info: {
                    title: "REST API",
                    version: "1.0.0",
                    description: "Example docs",
                },
            },
            apis: ["swagger.yaml"],
        });
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    }
}
//# sourceMappingURL=App.js.map