// @ts-nocheck

import type { AuthorizationRepository } from "./UserRepository";
import type { Role, User, Keycloak, UserDto, UserForm } from "@org/lib-api-client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject } from "@org/app-node-express/lib/ioc";
import { KeycloakDao } from "@org/app-node-express/lib/keycloak";
import { ROLE_LIST } from "@org/lib-api-client";

//@inject("AuthorizationRepository")
export class LocalUserRepository implements AuthorizationRepository {
  public async findUserByUsername(username: string): Promise<UserDto | null> {
    const users = await this.get<Keycloak.UserRepresentation[]>(`/users?username=${username}`);
    if (users.length === 0) return null;
    const user = users.filter(user => user.username === username)[0];
    return await this.userMapper(user);
  }

  public async findAllUsers(): Promise<UserDto[]> {
    const users = await this.get<Keycloak.UserRepresentation[]>(`/users`);
    const usersWithRoles = await Promise.all(users.map(user => this.userMapper(user)));
    return usersWithRoles;
  }

  public async updateUserRoles(userId: string, roleList: Role[]): Promise<void> {
    const roles = roleList.map(role => ({ id: this.ROLES[role], name: role }));
    await this.post(`/users/${userId}/role-mappings/clients/${KeycloakDao.KC_CLIENT_ID}`, roles);
  }

  public async updateUserPassword(userId: string, password: string): Promise<void> {
    await this.put(`/users/${userId}/reset-password`, {
      type: "password",
      value: password,
      temporary: false,
    });
  }

  public async createUser({
    hasCredentials,
    roles,
    password,
    ...model
  }: UserForm): Promise<UserDto> {
    const res = await this.post<Keycloak.UserRepresentation>(`/users`, {
      ...model,
      enabled: true,
    });

    let out = (await this.findUserByUsername(res.username))!;
    await this.updateUserRoles(out.id!, roles);
    if (hasCredentials) {
      await this.updateUserPassword(out.id!, password!);
    }
    out = (await this.findUserByUsername(res.username))!;
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

  private async userMapper(user: User): Promise<UserDto> {
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
  }
}
