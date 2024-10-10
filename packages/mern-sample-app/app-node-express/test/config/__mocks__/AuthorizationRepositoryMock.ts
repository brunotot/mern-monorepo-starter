import type { AuthorizationRepository } from "../../../dist/infrastructure/repository/UserRepository";
import type { KcUserRepresentation, User } from "@org/lib-api-client";

export class AuthorizationRepositoryMock implements AuthorizationRepository {
  static roles: Record<string, string[]> = {
    admin: ["avr-admin", "avr-user"],
    user: ["avr-user"],
  };

  static users: User[] = [
    {
      id: "1",
      username: "admin",
      enabled: true,
      realmRoles: ["avr-admin"],
    },
    {
      id: "2",
      username: "user",
      enabled: true,
      realmRoles: ["avr-user"],
    },
  ];

  async findRolesByUserId(userId: string): Promise<string[]> {
    return await Promise.resolve(AuthorizationRepositoryMock.roles[userId] ?? []);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return await Promise.resolve(
      AuthorizationRepositoryMock.users.find(user => user.username === username) ?? null,
    );
  }

  async findAllUsers(): Promise<User[]> {
    return await Promise.resolve(AuthorizationRepositoryMock.users);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createUser(_model: KcUserRepresentation): Promise<KcUserRepresentation> {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async deleteUser(_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
