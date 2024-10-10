import type { KcUserRepresentation } from "@org/lib-api-client";

import { inject } from "@org/app-node-express/ioc";
import { KeycloakDao } from "@org/app-node-express/lib/keycloak";

export interface AuthorizationRepository {
  findAllUsers(): Promise<KcUserRepresentation[]>;
  findUserByUsername(username: string): Promise<KcUserRepresentation | null>;
  findRolesByUserId(userId: string): Promise<string[]>;
  createUser(model: KcUserRepresentation): Promise<KcUserRepresentation>;
  deleteUser(id: string): Promise<void>;
}

/**
 * @see {@link https://www.keycloak.org/docs-api/22.0.1/rest-api/index.html Keycloak Admin REST API} documentation.
 */
@inject("AuthorizationRepository")
export class UserRepository extends KeycloakDao implements AuthorizationRepository {
  public async findUserByUsername(username: string): Promise<KcUserRepresentation | null> {
    const users = await this.get<KcUserRepresentation[]>(`/users?username=${username}`);
    if (users.length === 0) return null;
    const user = users.filter(user => user.username === username)[0];
    return user;
  }

  public async findAllUsers(): Promise<KcUserRepresentation[]> {
    // Fetch users without realmRoles
    const users = await this.get<Omit<KcUserRepresentation, "realmRoles">[]>(`/users`);

    // Map the users array to include realmRoles, awaiting each role fetch using findRolesByUserId
    const usersWithRealmRoles = await Promise.all(
      users.map(async user => {
        const realmRoles = await this.findRolesByUserId(user.id!); // Use existing method to fetch realm roles
        return {
          ...user,
          realmRoles, // Add realmRoles to the user object
        };
      }),
    );

    return usersWithRealmRoles;
  }

  public async findRolesByUserId(userId: string): Promise<string[]> {
    type ApiKeycloakRoles = { name: string }[];
    const res = await this.get<{
      realmMappings?: ApiKeycloakRoles;
      clientMappings?: Record<string, { mappings: ApiKeycloakRoles }>;
    }>(`/users/${userId}/role-mappings`);

    const mapped = [
      ...(res.realmMappings || []).map(({ name }: { name: string }) => name),
      ...Object.values(res.clientMappings || {})
        .map(v => v.mappings.map(({ name }: { name: string }) => name))
        .flat(),
    ];

    return mapped;
  }

  public async createUser(model: KcUserRepresentation): Promise<KcUserRepresentation> {
    const res = await this.post<KcUserRepresentation>(`/users`, model);
    return res;
  }

  public async deleteUser(id: string): Promise<void> {
    await this.delete(`/users/${id}`);
  }
}
