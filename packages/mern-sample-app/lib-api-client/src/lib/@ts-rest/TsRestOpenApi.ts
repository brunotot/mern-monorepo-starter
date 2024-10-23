import type * as TsRestTypes from "./TsRestTypes";
import type { TODO, zod, SecurityRequirementObject } from "@org/lib-commons";

import { generateSchema } from "@anatine/zod-openapi";
import { generateOpenApi } from "@ts-rest/open-api";

import { contracts } from "../../app/contracts";
import { Schemas } from "../../app/models";

/**
 * The version of OpenAPI used by `@ts-rest/openapi`
 * @remarks Minor version is **3.0**, written on **October 1st, 2024**.
 */
export const OPEN_API_MINOR_VERSION: NonNullable<Parameters<typeof generateSchema>[2]> = "3.0";

/** String literal **"openApiTags"**. Keyword recognized by ts-rest OpenAPI for defining a group name. */
export const TS_REST_OPEN_API_TAG = "openApiTags";

/** String literal **"openApiSecurity"**. Keyword recognized by ts-rest OpenAPI for defining route security. */
export const TS_REST_OPEN_API_SECURITY = "openApiSecurity";

export function buildOpenAPIObject(props: {
  version: string;
  authorizationUrl: string;
  tokenUrl: string;
}) {
  function applyCustomConfig(
    operation: TsRestTypes.SwaggerOperationObject,
  ): TsRestTypes.SwaggerOperationObject {
    const localOperation = { ...operation };

    const responses = localOperation.responses;
    for (const responseCode of Object.keys(responses)) {
      const response = responses[responseCode];
      const content = response.content;
      if (!("application/json" in content)) continue;
      const json = content["application/json"];
      const schema = json.schema as TsRestTypes.SwaggerSchema;
      json.schema = buildSchema(schema);
    }

    return localOperation;
  }

  function hasCustomTags(metadata: unknown): metadata is { [TS_REST_OPEN_API_TAG]: string[] } {
    return !!metadata && typeof metadata === "object" && TS_REST_OPEN_API_TAG in metadata;
  }

  function hasSecurity(
    metadata: unknown,
  ): metadata is { openApiSecurity: SecurityRequirementObject[] } {
    return !!metadata && typeof metadata === "object" && TS_REST_OPEN_API_SECURITY in metadata;
  }

  const operationMapper: TsRestTypes.SwaggerOperationMapper = (operation, appRoute) => {
    return {
      ...applyCustomConfig(operation),
      ...(hasCustomTags(appRoute.metadata)
        ? {
            tags: appRoute.metadata.openApiTags,
          }
        : {}),
      ...(hasSecurity(appRoute.metadata)
        ? {
            security: appRoute.metadata.openApiSecurity,
          }
        : {}),
    };
  };

  return generateOpenApi(contracts, buildSwaggerConfig(props), { operationMapper });
}

function buildSwaggerConfig(props: {
  version: string;
  authorizationUrl: string;
  tokenUrl: string;
}): TsRestTypes.SwaggerDocument {
  return {
    openapi: `${OPEN_API_MINOR_VERSION}.0`,
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
      version: props.version,
      description: "This is a dynamically generated Swagger API documentation",
    },
    components: {
      securitySchemes: {
        Keycloak: {
          type: "oauth2",
          flows: {
            password: {
              authorizationUrl: props.authorizationUrl,
              tokenUrl: props.tokenUrl,
              scopes: {},
            },
          },
        },
      },
      schemas: constructSwaggerSchemas(),
    },
  };
}

function constructSwaggerSchemas(): Record<string, zod.ZodTypeAny> {
  const swaggerSchemas: Record<string, zod.ZodTypeAny> = {};

  Object.entries(Schemas).forEach(([name, zodSchema]) => {
    const generatedSchema = generateSchema(
      zodSchema,
      false,
      OPEN_API_MINOR_VERSION,
    ) as TsRestTypes.SwaggerSchema;
    const sanitizedSchema = buildSchema(generatedSchema, true);
    swaggerSchemas[name] = sanitizedSchema;
  });

  return swaggerSchemas;
}

function buildSchema(schema: TsRestTypes.SwaggerSchema, ignoreTitle: boolean = false): TODO {
  return OPEN_API_MINOR_VERSION === "3.0"
    ? buildSchemaV3_0(schema as TsRestTypes.SwaggerSchemaV3_0, ignoreTitle)
    : buildSchemaV3_1(schema as TsRestTypes.SwaggerSchemaV3_1, ignoreTitle);
}

function buildSchemaV3_0(schema: TsRestTypes.SwaggerSchema, ignoreTitle: boolean = false): TODO {
  const localSchema = { ...schema };

  if (!ignoreTitle && localSchema.title && localSchema.title in Schemas) {
    return { $ref: `#/components/schemas/${localSchema.title}` };
  }

  if (localSchema.type === "object") {
    for (const name of Object.keys(localSchema.properties)) {
      localSchema.properties[name] = buildSchemaV3_0(localSchema.properties[name], false);
    }
  } else if (localSchema.type === "array") {
    localSchema.items = buildSchemaV3_0(localSchema.items, false);
  }

  return localSchema;
}

function buildSchemaV3_1(
  schema: TsRestTypes.SwaggerSchemaV3_1,
  ignoreTitle: boolean = false,
): TODO {
  let localSchema = { ...schema };

  if (!ignoreTitle && localSchema.title && localSchema.title in Schemas) {
    return { $ref: `#/components/schemas/${localSchema.title}` };
  }

  if (localSchema.type.length === 1 && localSchema.type[0] === "object") {
    localSchema = localSchema as TsRestTypes.SwaggerObjectSchemaV3_1;
    for (const name of Object.keys(localSchema.properties)) {
      localSchema.properties[name] = buildSchemaV3_1(localSchema.properties[name], false);
    }
  } else if (localSchema.type[0] === "array") {
    localSchema = localSchema as TsRestTypes.SwaggerArraySchemaV3_1;
    localSchema.items = buildSchemaV3_1(localSchema.items, false);
  }

  return localSchema;
}
