import type { AuthorizationRepository } from "../../../dist/infrastructure/repository/UserRepository";
import type { Keycloak } from "@org/lib-api-client";

export class AuthorizationRepositoryMock implements AuthorizationRepository {
  static roles: Record<string, string[]> = {
    admin: ["avr-admin", "avr-user"],
    user: ["avr-user"],
  };

  static users: Keycloak.UserRepresentation[] = [
    {
      id: "1",
      username: "admin",
      enabled: true,
      roles: [
        {
          name: "avr-admin",
        },
      ],
    },
    {
      id: "2",
      username: "user",
      enabled: true,
      roles: [
        {
          name: "avr-user",
        },
      ],
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateUserRoles(_userId: string, _roles: Keycloak.RoleRepresentation[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findUserByUsername(username: string): Promise<Keycloak.UserRepresentation | null> {
    return await Promise.resolve(
      AuthorizationRepositoryMock.users.find(user => user.username === username) ?? null,
    );
  }

  async findAllUsers(): Promise<Keycloak.UserRepresentation[]> {
    return await Promise.resolve(AuthorizationRepositoryMock.users);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createUser(_model: Keycloak.UserRepresentation): Promise<Keycloak.UserRepresentation> {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async deleteUser(_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
