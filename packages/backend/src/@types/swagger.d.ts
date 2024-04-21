import type HttpStatus from "http-status";
import type { oas31 } from "openapi3-ts";
import type { ReferenceObject, SchemaObject } from "openapi3-ts/oas31";
import type swaggerJsdoc from "swagger-jsdoc";

export type HttpStatusConverter<T> = {
  [K in keyof T]: T[K] extends number ? T[K] : never;
};

export type HttpStatusMain = Purify<HttpStatusConverter<typeof HttpStatus>>;

export type HttpStatusNumeric = Values<HttpStatusMain>;

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
