import type { AuthorizationRepository } from "../../../dist/infrastructure/repository/UserRepository";
import type { ApiKeycloakUser } from "@org/lib-api-client";

export class AuthorizationRepositoryMock implements AuthorizationRepository {
  static roles: Record<string, string[]> = {
    admin: ["admin", "user"],
    user: ["user"],
  };

  static users: ApiKeycloakUser[] = [
    {
      id: "1",
      username: "admin",
    },
    {
      id: "2",
      username: "user",
    },
  ];

  async findRolesByUserId(userId: string): Promise<string[]> {
    return await Promise.resolve(AuthorizationRepositoryMock.roles[userId] ?? []);
  }

  async findUserByUsername(username: string): Promise<ApiKeycloakUser | null> {
    return await Promise.resolve(
      AuthorizationRepositoryMock.users.find(user => user.username === username) ?? null,
    );
  }

  async findAllUsers(): Promise<ApiKeycloakUser[]> {
    return await Promise.resolve(AuthorizationRepositoryMock.users);
  }
}
