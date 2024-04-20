import { Class } from "@org/shared";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { RouteDecoratorManager } from "../../decorators/managers";
import { $BackendAppConfig } from "../BackendAppConfig";
import { SwaggerDefinition, SwaggerPath, SwaggerRequestMapping, SwaggerTag } from "./types";

const DEFAULT_SWAGGER_DEFINITION: SwaggerDefinition = {
  openapi: "3.0.0",
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
    version: $BackendAppConfig.env.PACKAGE_JSON_VERSION,
    description: "This is a dynamically generated Swagger API documentation",
  },
  components: {
    securitySchemas: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
  tags: [],
  paths: {},
};

export class SwaggerManager {
  #definition: SwaggerDefinition;
  #controllerClasses: Class[];

  get definition() {
    return this.#definition;
  }

  get controllerClasses() {
    return this.#controllerClasses;
  }

  get tags() {
    return this.#definition.tags;
  }

  constructor() {
    this.#definition = DEFAULT_SWAGGER_DEFINITION;
    this.#controllerClasses = [];
  }

  registerTag(tagData: SwaggerTag & { constructor: Class }) {
    if (this.tags.some(t => t.name === tagData.name)) return;
    const { constructor, ...tag } = tagData;
    this.controllerClasses.push(constructor);
    this.tags.push(tag);
  }

  #registerPath(path: string, requestMapping: SwaggerRequestMapping, data: SwaggerPath) {
    if (!this.definition.paths[path]) this.definition.paths[path] = {};
    this.definition.paths[path][requestMapping] = data;
  }

  #registerPaths() {
    this.controllerClasses.forEach(controllerClass => {
      const meta = RouteDecoratorManager.from(controllerClass).value;
      meta.routes.forEach(route => {
        const fullPath = `${meta.basePath}${route.path}`;
        const swagger = route.swagger ?? {};
        swagger.tags = [String(controllerClass.name)];
        this.#registerPath(fullPath, route.method, swagger);
      });
    });
  }

  buildSpec(): object {
    this.#registerPaths();
    return swaggerJsdoc({ definition: this.definition, apis: [] });
  }
}

export const $SwaggerManager = new SwaggerManager();

export function registerSwagger(app: express.Application, path: string) {
  const swaggerSpec = $SwaggerManager.buildSpec();
  app.use(`/${path}`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get(`/${path}.json`, (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
