import { type RequestHandler } from "express";
import { env } from "@org/app-node-express/env";
import Keycloak, { type Keycloak as KeycloakType, type KeycloakConfig } from "keycloak-connect";
import { keycloakMemoryStore as store } from "@org/app-node-express/lib/keycloak";
import { RestError } from "@org/lib-api-client";
import { type Authorization } from "@org/app-node-express/interface/Authorization";
import { inject } from "@org/app-node-express/decorators/inject";

@inject("Authorization")
export class KeycloakAuthorization implements Authorization {
  private readonly keycloak: KeycloakType;

  constructor() {
    this.keycloak = new Keycloak({ store }, this.buildKeycloakConfig());
    this.keycloak.accessDenied = () => {
      throw new RestError(401, "Unauthorized");
    };
  }

  public protect(): RequestHandler {
    return this.keycloak.protect();
  }

  public middleware(): RequestHandler[] {
    return this.keycloak.middleware();
  }

  private buildKeycloakConfig(): KeycloakConfig {
    return {
      realm: env.KEYCLOAK_REALM,
      resource: env.KEYCLOAK_ADMIN_CLI_ID,
      "bearer-only": env.KEYCLOAK_BEARER_ONLY,
      "auth-server-url": env.KEYCLOAK_URL,
      "confidential-port": env.KEYCLOAK_CONFIDENTIAL_PORT,
      "ssl-required": env.KEYCLOAK_SSL_REQUIRED,
    };
  }
}
