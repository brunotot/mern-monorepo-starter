import { KeycloakTokenManager } from "@/lib/keycloak/KeycloakTokenManager";
import { env } from "@/server/env";

export class KeycloakDao {
  private readonly TOKEN_MANAGER: KeycloakTokenManager;
  private readonly ADMIN_API_URL: string;
  private readonly KC_CLIENT_ID: string;

  protected ROLES: Record<string, string>;

  constructor() {
    const { KEYCLOAK_URL, KEYCLOAK_REALM } = env;
    this.TOKEN_MANAGER = new KeycloakTokenManager();
    this.ADMIN_API_URL = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}`;
    this.KC_CLIENT_ID = env.KEYCLOAK_APP_CLIENT_ID;
    this.initRoles();
  }

  public async put<T>(path: string, body: Partial<T>): Promise<T> {
    const endpoint = this.endpoint(path);
    const config = await this.buildConfig();
    const response = await this.doFetch(endpoint, {
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

  public async get<T>(path: string): Promise<T> {
    const endpoint = this.endpoint(path);
    const config = await this.buildConfig();
    const response = await this.doFetch(endpoint, config);
    if (!response.ok) throw new Error(`Failed to GET data: ${response.statusText}`);
    const jsonResponse = (await response.json()) as T;
    return jsonResponse;
  }

  public async post<T>(path: string, body: T): Promise<T> {
    const endpoint = this.endpoint(path);
    const config = await this.buildConfig();
    const response = await this.doFetch(endpoint, {
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

  public async delete(path: string): Promise<void> {
    const endpoint = this.endpoint(path);
    const config = await this.buildConfig();
    const response = await this.doFetch(endpoint, {
      ...config,
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`Failed to DELETE data: ${response.statusText}`);
  }

  private async doFetch(endpoint: string, config: RequestInit): Promise<Response> {
    let response: Response;
    try {
      response = await fetch(endpoint, config);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error("Keycloak server is not available");
    }
    return response;
  }

  private async initRoles() {
    const res = await this.get<{ id: string; name: string }[]>(
      `/clients/${this.KC_CLIENT_ID}/roles`,
    );
    this.ROLES = res.reduce(
      (acc, role) => {
        acc[role.name] = role.id;
        return acc;
      },
      {} as Record<string, string>,
    );
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
