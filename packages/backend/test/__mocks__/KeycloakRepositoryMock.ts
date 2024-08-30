import { type KeycloakUser } from "../../dist/config/Keycloak.config";
import { type AuthorizationRepository } from "../../dist/interface/AuthorizationRepository";

export class KeycloakRepositoryMock implements AuthorizationRepository {
  static roles: Record<string, string[]> = {
    admin: ["admin"],
    user: ["user"],
  };
  static users: KeycloakUser[] = [
    {
      id: "1",
      username: "admin",
    },
    {
      id: "2",
      username: "user",
    },
  ];

  async findUserByUsername(username: string): Promise<KeycloakUser | null> {
    return await Promise.resolve(
      KeycloakRepositoryMock.users.find(user => user.username === username) ?? null,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findRolesByUserId(userId: string): Promise<string[]> {
    return await Promise.resolve(KeycloakRepositoryMock.roles[userId] ?? []);
  }

  async findAllUsers(): Promise<KeycloakUser[]> {
    return await Promise.resolve(KeycloakRepositoryMock.users);
  }
}
