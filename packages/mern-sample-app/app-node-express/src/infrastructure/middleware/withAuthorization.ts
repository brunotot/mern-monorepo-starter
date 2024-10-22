import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { RequestHandler } from "express";
import type { Keycloak as KeycloakType, KeycloakConfig } from "keycloak-connect";

import { env } from "@org/app-node-express/server/env";
import { IocRegistry, inject } from "@org/app-node-express/ioc";
import { keycloakMemoryStore } from "@org/app-node-express/lib/keycloak";
import { RestError } from "@org/lib-api-client";
import Keycloak from "keycloak-connect";

const IOC_KEY = "AuthorizationMiddleware";

export interface AuthorizationMiddleware {
  middleware(): RequestHandler[];
  protect(): RequestHandler;
}

@inject(IOC_KEY)
export class WithAuthorization implements AuthorizationMiddleware {
  private readonly keycloak: KeycloakType;

  constructor() {
    this.keycloak = new Keycloak({ store: keycloakMemoryStore }, this.buildKeycloakConfig());
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

export function withAuthorization(): RouteMiddlewareFactory {
  return () => IocRegistry.getInstance().inject<AuthorizationMiddleware>(IOC_KEY).middleware();
}
