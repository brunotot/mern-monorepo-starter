import { Environment } from "@org/backend/config/singletons/Environment";
import axios, { type AxiosRequestConfig } from "axios";

export type KeycloakUser = {
  id: string;
  username: string;
};

export class KeycloakDao {
  private readonly KEYCLOAK_URL: string;
  private readonly KEYCLOAK_REALM: string;
  private readonly KEYCLOAK_ADMIN_CLI_ID: string;
  private readonly KEYCLOAK_ADMIN_CLI_SECRET: string;

  private token: string = "";
  private tokenExpiresAt: number | null = null;

  constructor() {
    const vars = Environment.getInstance().vars;
    this.KEYCLOAK_URL = vars.KEYCLOAK_URL;
    this.KEYCLOAK_REALM = vars.KEYCLOAK_REALM;
    this.KEYCLOAK_ADMIN_CLI_ID = vars.KEYCLOAK_ADMIN_CLI_ID;
    this.KEYCLOAK_ADMIN_CLI_SECRET = vars.KEYCLOAK_ADMIN_CLI_SECRET;
  }

  public endpoint(path: string): string {
    return this.genericEndpoint(path, true);
  }

  public async getToken(): Promise<string> {
    if (this.token && this.tokenExpiresAt && Date.now() < this.tokenExpiresAt) {
      return this.token;
    }

    const response = await axios.post(
      this.genericEndpoint("/protocol/openid-connect/token", false),
      this.auth(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    this.token = response.data.access_token;
    this.tokenExpiresAt = Date.now() + response.data.expires_in * 1000;

    return this.token;
  }

  protected async buildConfig() {
    const token = await this.getToken();
    return {
      headers: {
        Authorization: `bearer ${token}`,
      },
    } satisfies AxiosRequestConfig;
  }

  protected auth() {
    return new URLSearchParams({
      client_id: this.KEYCLOAK_ADMIN_CLI_ID,
      client_secret: this.KEYCLOAK_ADMIN_CLI_SECRET,
      grant_type: "client_credentials",
    });
  }

  protected genericEndpoint(path: string, asAdmin: boolean): string {
    return `${this.KEYCLOAK_URL}${asAdmin ? "/admin" : ""}/realms/${this.KEYCLOAK_REALM}${path}`;
  }
}

/**
 * @see {@link https://www.keycloak.org/docs-api/22.0.1/rest-api/index.html Keycloak Admin REST API} documentation.
 */
export class KeycloakRepository extends KeycloakDao {
  public async findAll(): Promise<KeycloakUser[]> {
    const endpoint = this.endpoint("/users");
    const response = await axios.get(endpoint, await this.buildConfig());
    return response.data;
  }

  public async findRolesById(id: string): Promise<string[]> {
    const endpoint = this.endpoint(`/users/${id}/role-mappings`);
    const response = await axios.get(endpoint, await this.buildConfig());
    return response.data.realmMappings.map((role: { name: string }) => role.name);
  }
}
