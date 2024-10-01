import type { generateOpenApi } from "@ts-rest/open-api";

export type SwaggerBaseProps = {
  title?: string;
};

export type SwaggerSchemaV3_0 = SwaggerBaseProps & SwaggerBaseSchemaV3_0;

export type SwaggerSchemaV3_1 = SwaggerBaseProps & SwaggerBaseSchemaV3_1;

export type SwaggerPrimitiveSchemaV3_0 = {
  type: "string" | "number" | "integer" | "boolean";
};

export type SwaggerObjectSchemaV3_0 = {
  type: "object";
  properties: Record<string, SwaggerSchemaV3_0>;
};

export type SwaggerArraySchemaV3_0 = {
  type: "array";
  items: SwaggerSchemaV3_0;
};

export type SwaggerPrimitiveSchemaV3_1 = {
  type: ["string"] | ["number"] | ["integer"] | ["boolean"];
};

export type SwaggerObjectSchemaV3_1 = {
  type: ["object"];
  properties: Record<string, SwaggerSchemaV3_1>;
};

export type SwaggerArraySchemaV3_1 = {
  type: ["array"];
  items: SwaggerSchemaV3_1;
};

export type SwaggerBaseSchemaV3_0 =
  | SwaggerPrimitiveSchemaV3_0
  | SwaggerObjectSchemaV3_0
  | SwaggerArraySchemaV3_0;

export type SwaggerBaseSchemaV3_1 =
  | SwaggerPrimitiveSchemaV3_1
  | SwaggerObjectSchemaV3_1
  | SwaggerArraySchemaV3_1;

export type SwaggerOptions = NonNullable<Parameters<typeof generateOpenApi>[2]>;

export type SwaggerOperationMapper = NonNullable<SwaggerOptions["operationMapper"]>;

export type SwaggerDocument = Parameters<typeof generateOpenApi>[1];

export type SwaggerOperationObject = Parameters<SwaggerOperationMapper>[0];

export type SwaggerSchema = SwaggerSchemaV3_0 | SwaggerSchemaV3_1;
