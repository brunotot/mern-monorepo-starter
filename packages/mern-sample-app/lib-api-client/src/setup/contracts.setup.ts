import { type ContractData } from "../config/Contract.config";
import { userContract } from "../contracts";
import { generateOpenApi } from "@ts-rest/open-api";
import { operationMapper } from "../config/Contract.config";

export const contracts = {
  User: userContract,
} as const satisfies ContractData;

export function buildOpenAPIObject(props: { version: string; authorizationUrl: string }) {
  return generateOpenApi(contracts, buildSwaggerConfig(props), { operationMapper });
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
