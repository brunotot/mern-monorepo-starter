import type { AuthorizationRepository } from "@org/app-node-express/interface/AuthorizationRepository";
import type { ApiKeycloakUser } from "@org/lib-api-client";

import { inject } from "@org/app-node-express/infrastructure/decorators/inject";
import { KeycloakDao } from "@org/app-node-express/lib/keycloak";

/**
 * @see {@link https://www.keycloak.org/docs-api/22.0.1/rest-api/index.html Keycloak Admin REST API} documentation.
 */
@inject("AuthorizationRepository")
export class UserRepository extends KeycloakDao implements AuthorizationRepository {
  public async findUserByUsername(username: string): Promise<ApiKeycloakUser | null> {
    const users = await this.get<ApiKeycloakUser[]>(`/users?username=${username}`);
    if (users.length === 0) return null;
    const user = users.filter(user => user.username === username)[0];
    return user;
  }

  public async findAllUsers(): Promise<ApiKeycloakUser[]> {
    const users = await this.get<ApiKeycloakUser[]>(`/users`);
    return users;
  }
}
