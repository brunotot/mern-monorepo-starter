import { env } from "@org/app-node-express/env";
import { type ApiKeycloakLogin } from "@org/lib-api-client";

export class KeycloakTokenManager {
  private readonly KEYCLOAK_LOGIN_URL: string;
  private readonly KEYCLOAK_LOGIN_CREDENTIALS: URLSearchParams;

  private cachedToken: string = "";
  private cachedTokenExpiresAt: number | null = null;

  private get cachedTokenValid(): boolean {
    return (
      !!this.cachedToken && !!this.cachedTokenExpiresAt && Date.now() < this.cachedTokenExpiresAt
    );
  }

  constructor() {
    this.KEYCLOAK_LOGIN_URL = `${env.KEYCLOAK_URL}/realms/${env.KEYCLOAK_REALM}/protocol/openid-connect/token`;
    this.KEYCLOAK_LOGIN_CREDENTIALS = new URLSearchParams({
      client_id: env.KEYCLOAK_ADMIN_CLI_ID,
      client_secret: env.KEYCLOAK_ADMIN_CLI_SECRET,
      grant_type: "client_credentials",
    });
  }

  public async getToken(): Promise<string> {
    if (this.cachedTokenValid) return this.cachedToken;
    const response = await fetch(this.KEYCLOAK_LOGIN_URL, this.buildLoginConfig());
    if (!response.ok) throw new Error(`Failed to fetch token: ${response.statusText}`);
    const result = (await response.json()) as ApiKeycloakLogin;
    const { access_token, expires_in } = result;
    this.cachedToken = access_token;
    this.cachedTokenExpiresAt = Date.now() + expires_in * 1000;
    return this.cachedToken;
  }

  private buildLoginConfig(): RequestInit {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Security-Policy":
          "default-src 'self' http://localhost:* 'unsafe-inline'; connect-src 'self' http://localhost:* 'unsafe-inline'; script-src 'self' http://localhost:* 'unsafe-inline'; img-src 'self' http://localhost:* 'unsafe-inline'; frame-src 'self' http://localhost:* 'unsafe-inline'",
      },
      body: this.KEYCLOAK_LOGIN_CREDENTIALS.toString(),
    };
  }
}
