import { type RequestHandler } from "express";
import { type IKeycloakAuth } from "./interface/IKeycloakAuth";
import { env } from "@org/backend/config/singletons/Environment";
import Keycloak, { type Keycloak as KeycloakType, type KeycloakConfig } from "keycloak-connect";
import { z } from "zod";
import { memoryStore } from "./KeycloakSession";
import { ErrorResponse } from "@org/shared";

export class KeycloakAuth implements IKeycloakAuth {
  private readonly keycloak: KeycloakType;

  constructor() {
    const {
      KEYCLOAK_URL,
      KEYCLOAK_REALM,
      KEYCLOAK_ADMIN_CLI_ID,
      KEYCLOAK_ADMIN_CLI_SECRET,
      KEYCLOAK_CONFIDENTIAL_PORT,
      KEYCLOAK_SSL_REQUIRED,
    } = env;

    const parseResult = z
      .object({
        KEYCLOAK_URL: z.string(),
        KEYCLOAK_REALM: z.string(),
        KEYCLOAK_ADMIN_CLI_ID: z.string(),
        KEYCLOAK_ADMIN_CLI_SECRET: z.string(),
        KEYCLOAK_CONFIDENTIAL_PORT: z.string(),
        KEYCLOAK_SSL_REQUIRED: z.string(),
      })
      .safeParse({
        KEYCLOAK_URL,
        KEYCLOAK_REALM,
        KEYCLOAK_ADMIN_CLI_ID,
        KEYCLOAK_ADMIN_CLI_SECRET,
        KEYCLOAK_CONFIDENTIAL_PORT,
        KEYCLOAK_SSL_REQUIRED,
      });

    if (!parseResult.success) {
      throw new Error(
        `Missing environment variables for Keycloak: "KEYCLOAK_URL", "KEYCLOAK_REALM", "KEYCLOAK_ADMIN_CLI_ID", "KEYCLOAK_ADMIN_CLI_SECRET", "KEYCLOAK_CONFIDENTIAL_PORT", "KEYCLOAK_SSL_REQUIRED"`,
      );
    }

    const config: KeycloakConfig = {
      realm: parseResult.data.KEYCLOAK_REALM,
      resource: parseResult.data.KEYCLOAK_ADMIN_CLI_ID,
      "bearer-only": true,
      "auth-server-url": parseResult.data.KEYCLOAK_URL,
      "confidential-port": parseResult.data.KEYCLOAK_CONFIDENTIAL_PORT,
      "ssl-required": parseResult.data.KEYCLOAK_SSL_REQUIRED, // use "all" in production,
    };

    this.keycloak = new Keycloak(
      {
        store: memoryStore,
      },
      config,
    );

    // Overriding keycloak access denied to return 401 status code and custom message.
    this.keycloak.accessDenied = () => {
      // Considering createError will throw new Error.
      throw new ErrorResponse("", 401, "Unauthorized");
    };
  }

  public protect(): RequestHandler {
    return this.keycloak.protect();
  }

  public middleware(): RequestHandler[] {
    return this.keycloak.middleware();
  }
}
