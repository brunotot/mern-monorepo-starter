import type { Role, User, Keycloak } from "@org/lib-api-client";

import { inject } from "@org/app-node-express/lib/ioc";
import { KeycloakDao } from "@org/app-node-express/lib/keycloak";

// TODO converting to DTO should happen at Service level
export interface AuthorizationRepository {
  findAllUsers(): Promise<User[]>;
  findUserByUsername(username: string): Promise<User | null>;
  createUser(model: User): Promise<User>;
  updateUser(model: User): Promise<User>;
  deleteUser(userId: string): Promise<void>;
  updateUserPassword(userId: string, password: string): Promise<void>;
  updateUserRoles(userId: string, roles: Role[]): Promise<void>;
  findRolesByUserId(userId: string): Promise<Keycloak.RoleRepresentation[]>;
  userHasCredentials(userId: string): Promise<boolean>;
}

/**
 * @see {@link https://www.keycloak.org/docs-api/latest/rest-api/index.html Keycloak Admin REST API} documentation.
 */
@inject("AuthorizationRepository")
export class UserRepository extends KeycloakDao implements AuthorizationRepository {
  public async findUserByUsername(username: string): Promise<User | null> {
    const users = await this.get<User[]>(`/users?username=${username}`);
    if (users.length === 0) return null;
    const user = users.filter(user => user.username === username)[0];
    return user;
  }

  public async findAllUsers(): Promise<User[]> {
    const users = await this.get<User[]>(`/users`);
    //const usersWithRoles = await Promise.all(users.map(user => this.userMapper(user)));
    //return usersWithRoles;
    return users;
  }

  public async updateUserRoles(userId: string, roleList: Role[]): Promise<void> {
    const roles = roleList.map(role => ({ id: this.ROLES[role], name: role }));
    await this.post(`/users/${userId}/role-mappings/clients/${KeycloakDao.KC_CLIENT_ID}`, roles);
  }

  public async updateUserPassword(userId: string, password: string): Promise<void> {
    if (!password) return;
    await this.put(`/users/${userId}/reset-password`, {
      type: "password",
      value: password,
      temporary: false,
    });
  }

  public async createUser(model: User): Promise<User> {
    const res = await this.post<User>(`/users`, {
      ...model,
      enabled: true,
    });

    return (await this.findUserByUsername(res.username))!;
  }

  public async updateUser(model: User): Promise<User> {
    const res = await this.put<User>(`/users/${model.id!}`, {
      ...model,
      enabled: true,
    });

    return (await this.findUserByUsername(res.username))!;
  }

  public async deleteUser(id: string): Promise<void> {
    await this.delete(`/users/${id}`);
  }

  public async findRolesByUserId(userId: string): Promise<Keycloak.RoleRepresentation[]> {
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

  public async userHasCredentials(userId: string): Promise<boolean> {
    const credentials = await this.get<Keycloak.CredentialRepresentation[]>(
      `/users/${userId}/credentials`,
    );
    return credentials.some(cred => cred.type === "password");
  }

  /*private async userMapper(user: User): Promise<User> {
    const roles = await this.findRolesByUserId(user.id!);

    const hasCredentials = (
      await this.get<Keycloak.CredentialRepresentation[]>(`/users/${user.id}/credentials`)
    ).some(cred => cred.type === "password");

    return {
      ...user,
      hasCredentials,
      roles: roles
        .filter(role => !!ROLE_LIST.find((r: string) => r === role.name))
        .map(role => role.name as Role),
    };
  }*/
}
