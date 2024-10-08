import { env } from "@org/app-node-express/env";

import { KeycloakTokenManager } from "./KeycloakTokenManager";

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
    const config = await this.buildConfig();
    const response = await fetch(endpoint, config);
    if (!response.ok) throw new Error(`Failed to GET data: ${response.statusText}`);
    const jsonResponse = (await response.json()) as T;
    return jsonResponse;
  }

  protected async post<T>(path: string, body: T): Promise<T> {
    const endpoint = this.endpoint(path);
    const config = await this.buildConfig();
    const response = await fetch(endpoint, {
      headers: {
        ...config.headers,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`Failed to POST data: ${response.statusText}`);
    return body;
  }

  protected async delete(path: string): Promise<void> {
    const endpoint = this.endpoint(path);
    const config = await this.buildConfig();
    const response = await fetch(endpoint, {
      ...config,
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`Failed to DELETE data: ${response.statusText}`);
  }

  private endpoint(path: string): string {
    const constructedPath = path.startsWith("/") ? path : `/${path}`;
    return `${this.ADMIN_API_URL}${constructedPath}`;
  }

  private async buildConfig() {
    const token = await this.TOKEN_MANAGER.getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
}
