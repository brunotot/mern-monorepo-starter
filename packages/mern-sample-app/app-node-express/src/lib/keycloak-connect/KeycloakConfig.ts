import { env } from "@org/app-node-express/env";
import { z } from "zod";

export type KeycloakRole = "admin" | "user";

export type KeycloakTokenData = {
  email_verified: boolean;
  preferred_username: string;
  sub: string;
  scope: string;
};

export type KeycloakUser = {
  id: string;
  username: string;
};

export type KeycloakUserRoles = {
  name: string;
}[];

export class KeycloakTokenManager {
  private readonly KEYCLOAK_LOGIN_URL: string;
  private readonly KEYCLOAK_LOGIN_CREDENTIALS: URLSearchParams;

  private cachedToken: string = "";
  private cachedTokenExpiresAt: number | null = null;

  constructor() {
    const { KEYCLOAK_URL, KEYCLOAK_REALM, KEYCLOAK_ADMIN_CLI_ID, KEYCLOAK_ADMIN_CLI_SECRET } = env;

    const parseResult = z
      .object({
        KEYCLOAK_URL: z.string(),
        KEYCLOAK_REALM: z.string(),
        KEYCLOAK_ADMIN_CLI_ID: z.string(),
        KEYCLOAK_ADMIN_CLI_SECRET: z.string(),
      })
      .safeParse({
        KEYCLOAK_URL,
        KEYCLOAK_REALM,
        KEYCLOAK_ADMIN_CLI_ID,
        KEYCLOAK_ADMIN_CLI_SECRET,
      });

    if (!parseResult.success) {
      throw new Error(
        `Missing environment variables for Keycloak: "KEYCLOAK_URL", "KEYCLOAK_REALM", "KEYCLOAK_ADMIN_CLI_ID", "KEYCLOAK_ADMIN_CLI_SECRET"`,
      );
    }

    this.KEYCLOAK_LOGIN_URL = `${parseResult.data.KEYCLOAK_URL}/realms/${parseResult.data.KEYCLOAK_REALM}/protocol/openid-connect/token`;

    this.KEYCLOAK_LOGIN_CREDENTIALS = new URLSearchParams({
      client_id: parseResult.data.KEYCLOAK_ADMIN_CLI_ID,
      client_secret: parseResult.data.KEYCLOAK_ADMIN_CLI_SECRET,
      grant_type: "client_credentials",
    });
  }

  public async getToken(): Promise<string> {
    if (this.isCachedTokenValid()) {
      return this.cachedToken;
    }

    type KeycloakLoginResponse = {
      access_token: string;
      expires_in: number;
    };

    const response = await fetch(this.KEYCLOAK_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Security-Policy":
          "default-src 'self' http://localhost:* 'unsafe-inline'; connect-src 'self' http://localhost:* 'unsafe-inline'; script-src 'self' http://localhost:* 'unsafe-inline'; img-src 'self' http://localhost:* 'unsafe-inline'; frame-src 'self' http://localhost:* 'unsafe-inline'",
      },
      body: this.KEYCLOAK_LOGIN_CREDENTIALS.toString(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.statusText}`);
    }

    const data: KeycloakLoginResponse = await response.json();

    this.cachedToken = data.access_token;
    this.cachedTokenExpiresAt = Date.now() + data.expires_in * 1000;

    return this.cachedToken;
  }

  private isCachedTokenValid(): boolean {
    return (
      !!this.cachedToken && !!this.cachedTokenExpiresAt && Date.now() < this.cachedTokenExpiresAt
    );
  }
}

export class KeycloakDao {
  private readonly TOKEN_MANAGER: KeycloakTokenManager;
  private readonly ADMIN_API_URL: string;

  constructor() {
    const { KEYCLOAK_URL, KEYCLOAK_REALM } = env;
    this.TOKEN_MANAGER = new KeycloakTokenManager();
    this.ADMIN_API_URL = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}`;
  }

  protected async get<T>(path: string): Promise<T> {
    const endpoint = this.endpoint(path);
    const response = await fetch(endpoint, await this.buildConfig());
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return response.json();
  }

  private endpoint(path: string): string {
    const constructedPath = path.startsWith("/") ? path : `/${path}`;
    return `${this.ADMIN_API_URL}${constructedPath}`;
  }

  private async buildConfig() {
    const token = await this.TOKEN_MANAGER.getToken();
    return {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
  }
}
