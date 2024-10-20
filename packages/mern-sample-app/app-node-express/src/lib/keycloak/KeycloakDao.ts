import { env } from "@org/app-node-express/env";

import { KeycloakTokenManager } from "./KeycloakTokenManager";

export class KeycloakDao {
  private readonly TOKEN_MANAGER: KeycloakTokenManager;
  private readonly ADMIN_API_URL: string;

  public static readonly KC_CLIENT_ID = "9943a0fd-de66-4247-a7b8-c0a94a70b393";

  protected ROLES: Record<string, string>;

  constructor() {
    const { KEYCLOAK_URL, KEYCLOAK_REALM } = env;
    this.TOKEN_MANAGER = new KeycloakTokenManager();
    this.ADMIN_API_URL = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}`;
    this.initRoles();
  }

  private async initRoles() {
    const res = await this.get<{ id: string; name: string }[]>(
      `/clients/${KeycloakDao.KC_CLIENT_ID}/roles`,
    );
    this.ROLES = res.reduce(
      (acc, role) => {
        acc[role.name] = role.id;
        return acc;
      },
      {} as Record<string, string>,
    );
  }

  protected async put<T>(path: string, body: Partial<T>): Promise<T> {
    const endpoint = this.endpoint(path);
    const config = await this.buildConfig();
    const response = await fetch(endpoint, {
      headers: {
        ...config.headers,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`Failed to PUT data: ${response.statusText}`);
    return body as T;
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
