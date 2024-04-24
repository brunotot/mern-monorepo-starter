import { type OpenApiZodAny, generateSchema } from "@anatine/zod-openapi";
import type express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type HttpStatus from "http-status";
import type { oas31 } from "openapi3-ts";
import type { ReferenceObject, SchemaObject } from "openapi3-ts/oas31";
import type z from "zod";

// @shared
import type { Class, TODO } from "@org/shared";

// @backend
import { Environment, RouteDecoratorManager } from "@config";

export class Swagger {
  private static instance: Swagger;

  static getInstance(): Swagger {
    Swagger.instance ??= new Swagger();
    return Swagger.instance;
  }

  readonly definition: SwaggerDefinition;
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
    this.definition.components.schemas![description] = this.#generateSwaggerSchema(schema);
  }

  public registerTag(tagData: SwaggerTag & { constructor: Class }) {
    if (this.definition.tags.some(t => t.name === tagData.name)) return;
    const { constructor, ...tag } = tagData;
    this.controllerClasses.push(constructor);
    this.definition.tags.push(tag);
  }

  public registerSwagger(app: express.Application, path: string) {
    const swaggerSpec = this.#buildSpec();
    app.use(`/${path}`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get(`/${path}.json`, (_req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
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

  #registerPath(path: string, requestMapping: SwaggerRequestMapping, data: SwaggerPath) {
    if (!this.definition.paths[path]) this.definition.paths[path] = {};
    this.definition.paths[path][requestMapping] = data;
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

/** Types */

export type HttpStatusConverter<T> = {
  [K in keyof T]: T[K] extends number ? T[K] : never;
};

export type HttpStatusMain = Purify<HttpStatusConverter<typeof HttpStatus>>;

/**
 * A type that extracts the values from the properties of an object type `T`.
 * @typeParam T - An object type.
 */
export type Values<T> = T[keyof T];

/**
 * A type that excludes properties with values of type `TExclude` from `TParent`.
 * @typeParam TParent - The parent type.
 * @typeParam TExclude - The type to exclude from `TParent`.
 */
export type Exclude<TParent, TExclude> = Pick<
  TParent,
  Values<{
    [Prop in keyof TParent]: [TParent[Prop]] extends [TExclude] ? never : Prop;
  }>
>;

export type HttpStatusNumeric = Values<HttpStatusMain>;

/**
 * A type that removes properties with values of type `never` from `T`.
 * @typeParam T - The type to purify.
 */
export type Purify<T> = Exclude<T, never>;

export type SwaggerExternalDocs = {
  description: string;
  url: string;
};

export type SwaggerTag = {
  name: string;
  description?: string;
  externalDocs?: SwaggerExternalDocs;
};

export type SwaggerPath = {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  requestBody?: SwaggerRequestBody;
  responses?: SwaggerResponse;
};

export type SwaggerPaths = Record<string, Partial<Record<SwaggerRequestMapping, SwaggerPath>>>;

export type SwaggerRequestMapping =
  | "put"
  | "get"
  | "post"
  | "delete"
  | "patch"
  | "options"
  | "head";

export type SwaggerResponse = Partial<
  Record<
    HttpStatusNumeric | "default",
    {
      description?: string;
      content?: SwaggerRequestContent;
    }
  >
>;

export type SwaggerSchemaObject = SchemaObject | ReferenceObject;

export type SwaggerRequestContent = Record<string, { schema: SwaggerSchemaObject }>;

export type SwaggerRequestBody = {
  description?: string;
  content?: SwaggerRequestContent;
  required?: boolean;
};

export type SwaggerDefinition = swaggerJsdoc.SwaggerDefinition & {
  tags: SwaggerTag[];
  paths: SwaggerPaths;
  components: oas31.ComponentsObject;
};
