import * as KC from "@org/backend/config/Keycloak.config";
import { type AuthorizationRepository } from "@org/backend/interface/AuthorizationRepository";

/**
 * @see {@link https://www.keycloak.org/docs-api/22.0.1/rest-api/index.html Keycloak Admin REST API} documentation.
 */
export class KeycloakRepository extends KC.KeycloakDao implements AuthorizationRepository {
  public async findUserByUsername(username: string): Promise<KC.KeycloakUser | null> {
    const users = await this.get<KC.KeycloakUser[]>(`/users?username=${username}`);
    if (users.length === 0) return null;
    return users.filter(user => user.username === username)[0];
  }

  public async findAllUsers(): Promise<KC.KeycloakUser[]> {
    return await this.get<KC.KeycloakUser[]>(`/users`);
  }

  public async findRolesByUserId(userId: string): Promise<string[]> {
    const res = await this.get<KC.KeycloakUserRoles>(`/users/${userId}/role-mappings/realm`);
    return res.map(({ name }) => name);
  }
}
