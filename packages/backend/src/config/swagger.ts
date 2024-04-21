import type { OpenApiZodAny } from "@anatine/zod-openapi";
import type { Class } from "@org/shared";
import type express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { RouteDecoratorManager, VAR_ZOD_ENVIRONMENT, generateSwaggerSchema } from "@internal";
import type { SwaggerDefinition, SwaggerPath, SwaggerRequestMapping, SwaggerTag } from "@types";

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
    version: VAR_ZOD_ENVIRONMENT.PACKAGE_JSON_VERSION,
    description: "This is a dynamically generated Swagger API documentation",
  },
  components: {
    schemas: {},
    securitySchemes: {
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

const definition: SwaggerDefinition = DEFAULT_SWAGGER_DEFINITION;
const controllerClasses: Class[] = [];

export function registerSchema(name: string, schema: OpenApiZodAny) {
  const description = name;
  if (!description) throw new Error("Schema must have a description");
  definition.components.schemas![description] = generateSwaggerSchema(schema);
}

export function registerTag(tagData: SwaggerTag & { constructor: Class }) {
  if (definition.tags.some(t => t.name === tagData.name)) return;
  const { constructor, ...tag } = tagData;
  controllerClasses.push(constructor);
  definition.tags.push(tag);
}

export function registerPath(
  path: string,
  requestMapping: SwaggerRequestMapping,
  data: SwaggerPath,
) {
  if (!definition.paths[path]) definition.paths[path] = {};
  definition.paths[path][requestMapping] = data;
}

export function registerPaths() {
  controllerClasses.forEach(controllerClass => {
    const meta = RouteDecoratorManager.from(controllerClass).value;
    meta.routes.forEach(route => {
      const fullPath = `${meta.basePath}${route.path}`;
      const swagger = route.swagger ?? {};
      swagger.tags = [String(controllerClass.name)];
      registerPath(fullPath, route.method, swagger);
    });
  });
}

export function buildSpec(): object {
  registerPaths();
  return swaggerJsdoc({ definition, apis: [] });
}

export function registerSwagger(app: express.Application, path: string) {
  const swaggerSpec = buildSpec();
  app.use(`/${path}`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get(`/${path}.json`, (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
