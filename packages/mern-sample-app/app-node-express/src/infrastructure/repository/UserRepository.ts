import type { Role, User, Keycloak } from "@org/lib-api-client";

import { inject } from "@org/app-node-express/ioc";
import { KeycloakDao } from "@org/app-node-express/lib/keycloak";
import { ROLE_LIST } from "@org/lib-api-client";

export interface AuthorizationRepository {
  findAllUsers(): Promise<User[]>;
  findUserByUsername(username: string): Promise<User | null>;
  createUser(model: User): Promise<User>;
  deleteUser(userId: string): Promise<void>;
  updateUserRoles(userId: string, roles: Role[]): Promise<void>;
}

/**
 * @see {@link https://www.keycloak.org/docs-api/22.0.1/rest-api/index.html Keycloak Admin REST API} documentation.
 */
@inject("AuthorizationRepository")
export class UserRepository extends KeycloakDao implements AuthorizationRepository {
  public async findUserByUsername(username: string): Promise<User | null> {
    const users = await this.get<Keycloak.UserRepresentation[]>(`/users?username=${username}`);
    if (users.length === 0) return null;
    const user = users.filter(user => user.username === username)[0];
    return await this.userMapper(user);
  }

  public async findAllUsers(): Promise<User[]> {
    const users = await this.get<Keycloak.UserRepresentation[]>(`/users`);
    const usersWithRoles = await Promise.all(users.map(user => this.userMapper(user)));
    return usersWithRoles;
  }

  public async updateUserRoles(userId: string, roleList: Role[]): Promise<void> {
    const roles = roleList.map(role => ({ id: this.ROLES[role], name: role }));
    await this.post(`/users/${userId}/role-mappings/clients/${KeycloakDao.KC_CLIENT_ID}`, roles);
  }

  public async createUser({ roles, ...model }: User): Promise<User> {
    const res = await this.post<Keycloak.UserRepresentation>(`/users`, {
      ...model,
      enabled: true,
    });

    const out = (await this.findUserByUsername(res.username))!;
    this.updateUserRoles(out.id!, roles);
    return out;
  }

  public async deleteUser(id: string): Promise<void> {
    await this.delete(`/users/${id}`);
  }

  private async findRolesByUserId(userId: string): Promise<Keycloak.RoleRepresentation[]> {
    const res = await this.get<{
      realmMappings?: Keycloak.RoleRepresentation[];
      clientMappings?: Record<string, { mappings: Keycloak.RoleRepresentation[] }>;
    }>(`/users/${userId}/role-mappings`);

    const mapped = [
      ...(res.realmMappings || []),
      ...Object.values(res.clientMappings || {})
        .map(v => v.mappings)
        .flat(),
    ];

    return mapped;
  }

  private async userMapper(user: Keycloak.UserRepresentation): Promise<User> {
    const roles = await this.findRolesByUserId(user.id!);
    return {
      ...user,
      roles: roles
        .filter(role => !!ROLE_LIST.find((r: string) => r === role.name))
        .map(role => role.name as Role),
    };
  }
}
