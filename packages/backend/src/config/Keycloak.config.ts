import { env } from "@org/backend/setup/env.setup";
import axios, { type AxiosRequestConfig } from "axios";
import { z } from "zod";

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
  private readonly KEYCLOAK_LOGIN_CONFIG: AxiosRequestConfig<URLSearchParams>;

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

    this.KEYCLOAK_LOGIN_CONFIG = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Security-Policy":
          "default-src 'self' http://localhost:* 'unsafe-inline'; connect-src 'self' http://localhost:* 'unsafe-inline'; script-src 'self' http://localhost:* 'unsafe-inline'; img-src 'self' http://localhost:* 'unsafe-inline'; frame-src 'self' http://localhost:* 'unsafe-inline'",
      },
    };
  }

  public async getToken(): Promise<string> {
    if (this.isCachedTokenValid()) {
      return this.cachedToken;
    }

    type KeycloakLoginResponse = {
      access_token: string;
      expires_in: number;
    };

    const response = await axios.post<KeycloakLoginResponse>(
      this.KEYCLOAK_LOGIN_URL,
      this.KEYCLOAK_LOGIN_CREDENTIALS,
      this.KEYCLOAK_LOGIN_CONFIG,
    );

    this.cachedToken = response.data.access_token;
    this.cachedTokenExpiresAt = Date.now() + response.data.expires_in * 1000;

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
    const response = await axios.get<T>(endpoint, await this.buildConfig());
    return response.data;
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
    } satisfies AxiosRequestConfig;
  }
}
