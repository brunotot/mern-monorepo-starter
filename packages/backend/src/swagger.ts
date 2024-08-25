import type express from "express";
import { generateOpenApi } from "@ts-rest/open-api";
import swaggerUi from "swagger-ui-express";
import { CONTRACTS, operationMapper } from "@org/shared";
import { env, SERVER_URL } from "@org/backend/config/singletons/Environment";

export const SWAGGER_PATH = "/api-docs";

export type SwaggerConfig = Parameters<typeof generateOpenApi>[1];

function buildSwaggerConfig(): SwaggerConfig {
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
      version: env.PACKAGE_JSON_VERSION,
      description: "This is a dynamically generated Swagger API documentation",
    },
    components: {
      securitySchemes: {
        my_auth_whatever: {
          type: "oauth2",
          flows: {
            implicit: {
              authorizationUrl: `${env.KEYCLOAK_URL}/realms/master/protocol/openid-connect/auth`,
              scopes: {},
            },
          },
        },
      },
    },
    security: [
      {
        my_auth_whatever: [],
      },
    ],
  };
}

export function applySwaggerMiddleware(expressApp: express.Application) {
  const swaggerConfig = buildSwaggerConfig();
  const openApiDocument = generateOpenApi(CONTRACTS, swaggerConfig, { operationMapper });

  expressApp.use(
    SWAGGER_PATH,
    swaggerUi.serve,
    swaggerUi.setup(openApiDocument, {
      swaggerOptions: {
        oauth2RedirectUrl: `${SERVER_URL}/api-docs/oauth2-redirect.html`,
      },
      customCssUrl: "/css/swagger.css",
      customJs: "/js/swagger.js",
    }),
  );
}
