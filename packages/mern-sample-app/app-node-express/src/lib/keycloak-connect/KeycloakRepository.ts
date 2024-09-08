import { type AuthorizationRepository } from "@org/app-node-express/interface/AuthorizationRepository";
import {
  KeycloakDao,
  type KeycloakUser,
  type KeycloakUserRoles,
} from "@org/app-node-express/lib/keycloak-connect/KeycloakConfig";

// PROBLEM JE STO SE KeycloakRepository svakako pokrene (konstruktor, super.KeycloakDao) a to ne zelimo u testovima
// logika je takva da se svi defaultni instanciraju i tek onda se mergaju mockane instance u jedan objekt

/**
 * @see {@link https://www.keycloak.org/docs-api/22.0.1/rest-api/index.html Keycloak Admin REST API} documentation.
 */
export class KeycloakRepository extends KeycloakDao implements AuthorizationRepository {
  public async findUserByUsername(username: string): Promise<KeycloakUser | null> {
    const users = await this.get<KeycloakUser[]>(`/users?username=${username}`);
    if (users.length === 0) return null;
    return users.filter(user => user.username === username)[0];
  }

  public async findAllUsers(): Promise<KeycloakUser[]> {
    return await this.get<KeycloakUser[]>(`/users`);
  }

  public async findRolesByUserId(userId: string): Promise<string[]> {
    const res = await this.get<KeycloakUserRoles>(`/users/${userId}/role-mappings/realm`);
    return res.map(({ name }) => name);
  }
}
