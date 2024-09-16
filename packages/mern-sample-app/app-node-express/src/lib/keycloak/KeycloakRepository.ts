import { type AuthorizationRepository } from "@org/app-node-express/interface/AuthorizationRepository";
import { KeycloakDao } from "@org/app-node-express/lib/keycloak/KeycloakDao";
import type { User, ApiKeycloakUser, ApiKeycloakRoles } from "@org/lib-api-client";
import { type TODO } from "@org/lib-commons";

/**
 * @see {@link https://www.keycloak.org/docs-api/22.0.1/rest-api/index.html Keycloak Admin REST API} documentation.
 */
export class KeycloakRepository extends KeycloakDao implements AuthorizationRepository {
  public async findUserByUsername(username: string): Promise<User | null> {
    const users = await this.get<ApiKeycloakUser[]>(`/users?username=${username}`);
    if (users.length === 0) return null;
    return this.mapper(users.filter(user => user.username === username)[0]);
  }

  public async findAllUsers(): Promise<User[]> {
    return (await this.get<ApiKeycloakUser[]>(`/users`)).map(this.mapper);
  }

  public async findRolesByUserId(userId: string): Promise<string[]> {
    const res = await this.get<ApiKeycloakRoles>(`/users/${userId}/role-mappings/realm`);
    return res.map(({ name }: TODO) => name);
  }

  private mapper(model: ApiKeycloakUser): User {
    return { ...model, roles: [] };
  }
}
