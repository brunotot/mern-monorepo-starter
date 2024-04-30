import { generateSchema, type OpenApiZodAny } from "@anatine/zod-openapi";
import { type RouteMethod } from "@models";
import { type Class, type TODO } from "@org/shared";
import type express from "express";
import {
  type OpenAPIObject,
  type TagObject,
  type OperationObject as OperationObjectNative,
  type SchemaObject,
} from "openapi3-ts/oas31";
import swaggerJsdoc from "swagger-jsdoc";
import { type z } from "zod";
import { Environment } from "./Environment";
import { RouteDecoratorManager } from "./RouteDecoratorManager";
import swaggerUi from "swagger-ui-express";

export type OperationObject = Omit<OperationObjectNative, "tags">;

export class Swagger {
  private static instance: Swagger;

  static getInstance(): Swagger {
    Swagger.instance ??= new Swagger();
    return Swagger.instance;
  }

  readonly definition: OpenAPIObject;
  readonly controllerClasses: Class[];

  private constructor() {
    this.controllerClasses = [];
    this.definition = {
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
        version: Environment.getInstance().vars.PACKAGE_JSON_VERSION,
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
  }

  public buildSwaggerBody(schema: z.AnyZodObject) {
    const description = schema.description;

    return {
      content: {
        "application/json": {
          schema: description
            ? { $ref: `#/components/schemas/${description}` }
            : this.#generateSwaggerSchema(schema),
        },
      },
    };
  }

  public registerSchema(name: string, schema: z.AnyZodObject) {
    const description = name;
    if (!description) throw new Error("Schema must have a description");
    this.definition.components!.schemas![description] = this.#generateSwaggerSchema(schema);
  }

  public registerTag(tagData: TagObject & { constructor: Class }) {
    if (this.definition.tags!.some(t => t.name === tagData.name)) return;
    const { constructor, ...tag } = tagData;
    this.controllerClasses.push(constructor);
    this.definition.tags!.push(tag);
  }

  public registerSwagger(app: express.Application, path: string) {
    const swaggerSpec = this.#buildSpec();
    app.use(`/${path}`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get(`/${path}.json`, (_req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
  }

  public getRefData(schema: z.AnyZodObject) {
    const description = schema.description;
    if (!description) throw new Error("Schema must have a description");
    return { $ref: `#/components/schemas/${description}` };
  }

  #registerPaths() {
    this.controllerClasses.forEach(controllerClass => {
      const meta = RouteDecoratorManager.from(controllerClass).value;
      meta.routes.forEach(route => {
        const fullPath = `${meta.basePath}${route.path}`;
        const swagger = (route.swagger ?? {}) as OperationObjectNative;
        swagger.tags = [String(controllerClass.name)];
        this.#registerPath(fullPath, route.method, swagger);
      });
    });
  }

  #buildSpec(): object {
    this.#registerPaths();
    return swaggerJsdoc({ definition: this.definition, apis: [] });
  }

  #registerPath(path: string, requestMapping: RouteMethod, data: OperationObject) {
    if (!this.definition.paths![path]) this.definition!.paths![path] = {};
    this.definition.paths![path][requestMapping] = data;
  }

  #generateSwaggerSchema(schema: OpenApiZodAny): SchemaObject {
    const generated = generateSchema(schema);
    const iterate = (obj: TODO) => {
      for (const key in obj) {
        if (key === "type" && Array.isArray(obj[key]) && obj[key].length === 1) {
          obj[key] = obj[key][0];
        } else if (typeof obj[key] === "object") {
          iterate(obj[key]);
        }
      }
    };
    iterate(generated);
    return generated;
  }
}
