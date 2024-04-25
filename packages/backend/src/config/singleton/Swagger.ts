import { type OpenApiZodAny, generateSchema } from "@anatine/zod-openapi";
import type express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type HttpStatus from "http-status";
import type { OpenAPIObject, OperationObject, SchemaObject, TagObject } from "openapi3-ts/oas31";
import type z from "zod";
import type { Class, TODO } from "@org/shared";
import { Environment } from "@config/singleton/Environment";
import { RouteDecoratorManager, type RouteMethod } from "@config/singleton/RouteDecoratorManager";

// Local types
type Values<T> = T[keyof T];
type FilterNumbers<T> = { [K in keyof T]: T[K] extends number ? T[K] : never };
type Exclude<T, E> = Pick<T, Values<{ [K in keyof T]: [T[K]] extends [E] ? never : K }>>;
type HttpResponseStatusRecord = Exclude<FilterNumbers<typeof HttpStatus>, never>;

/** 100 | 101 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | ... 27 more ... | 511 */
export type HttpResponseStatus = Values<HttpResponseStatusRecord>;

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
        const swagger = route.swagger ?? {};
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
