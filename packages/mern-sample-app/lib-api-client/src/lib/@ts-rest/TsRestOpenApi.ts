import { generateOpenApi } from "@ts-rest/open-api";
import { contracts } from "../../app/contracts";

/** String literal **"openApiTags"**. Keyword recognized by ts-rest OpenAPI for defining a group name. */
export const TS_REST_OPEN_API_TAG = "openApiTags";

export function buildOpenAPIObject(props: { version: string; authorizationUrl: string }) {
  function hasCustomTags(metadata: unknown): metadata is { [TS_REST_OPEN_API_TAG]: string[] } {
    return !!metadata && typeof metadata === "object" && TS_REST_OPEN_API_TAG in metadata;
  }

  function buildSwaggerConfig(props: {
    version: string;
    authorizationUrl: string;
  }): Parameters<typeof generateOpenApi>[1] {
    return {
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
              implicit: {
                authorizationUrl: props.authorizationUrl,
                scopes: {},
              },
            },
          },
        },
      },
      security: [
        {
          Keycloak: [],
        },
      ],
    };
  }

  return generateOpenApi(contracts, buildSwaggerConfig(props), {
    operationMapper: (operation, appRoute) => ({
      ...operation,
      ...(hasCustomTags(appRoute.metadata)
        ? {
            tags: appRoute.metadata.openApiTags,
          }
        : {}),
    }),
  });
}
