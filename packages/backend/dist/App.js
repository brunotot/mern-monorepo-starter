var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { databaseConnect } from "./config";
import { getVar } from "./config/vars.config";
import { logger, stream } from "./utils/logger";
//import { ErrorMiddleware } from "@middlewares/error.middleware";
export class App {
    constructor(routes) {
        this.app = express();
        this.env = getVar("NODE_ENV") || "development";
        this.port = getVar("PORT") || 3000;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
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
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield databaseConnect();
        });
    }
    initializeMiddlewares() {
        this.app.use(morgan(getVar("LOG_FORMAT"), { stream }));
        this.app.use(cors({
            origin: getVar("ORIGIN"),
            credentials: getVar("CREDENTIALS") === "true",
        }));
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            route.setupEndpoints();
            this.app.use("/", route.router);
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