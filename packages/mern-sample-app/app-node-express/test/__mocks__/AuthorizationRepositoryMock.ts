import type { AuthorizationRepository } from "../../dist/interface/AuthorizationRepository";
import type { ApiKeycloakUser } from "@org/lib-api-client";

export class AuthorizationRepositoryMock implements AuthorizationRepository {
  static users: ApiKeycloakUser[] = [
    {
      id: "1",
      username: "admin",
      realmRoles: ["admin"],
    },
    {
      id: "2",
      username: "user",
      realmRoles: ["user"],
    },
  ];

  async findUserByUsername(username: string): Promise<ApiKeycloakUser | null> {
    return await Promise.resolve(
      AuthorizationRepositoryMock.users.find(user => user.username === username) ?? null,
    );
  }

  async findAllUsers(): Promise<ApiKeycloakUser[]> {
    return await Promise.resolve(AuthorizationRepositoryMock.users);
  }
}
