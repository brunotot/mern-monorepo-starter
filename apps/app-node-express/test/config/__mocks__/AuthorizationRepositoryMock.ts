import type { AuthorizationRepository } from "@/app/infrastructure/repository/UserRepository";
import type { Keycloak, Role, User } from "@org/lib-api-client";

export class AuthorizationRepositoryMock implements AuthorizationRepository {
  private static readonly userRoles: Record<string, Keycloak.RoleRepresentation[]> = {
    test: [
      {
        name: "avr-user",
        id: "avr-user",
        description: "avr-user",
      },
    ],
    admin: [
      {
        name: "avr-admin",
        id: "avr-admin",
        description: "avr-admin",
      },
      {
        name: "avr-user",
        id: "avr-user",
        description: "avr-user",
      },
    ],
  };

  private static readonly users: User[] = [
    {
      username: "test",
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
      enabled: true,
    },
    {
      username: "admin",
      firstName: "admin",
      lastName: "admin",
      email: "admin@admin.com",
      enabled: true,
    },
  ];

  async findAllUsers(): Promise<User[]> {
    return Promise.resolve(AuthorizationRepositoryMock.users);
  }
  async findUserByUsername(username: string): Promise<User | null> {
    return AuthorizationRepositoryMock.users.find(user => user.username === username) ?? null;
  }
  async createUser(model: User): Promise<User> {
    AuthorizationRepositoryMock.users.push(model);
    return model;
  }
  async updateUser(model: User): Promise<User> {
    const index = AuthorizationRepositoryMock.users.findIndex(
      user => user.username === model.username,
    );
    AuthorizationRepositoryMock.users[index] = model;
    return model;
  }
  async deleteUser(userId: string): Promise<void> {
    const index = AuthorizationRepositoryMock.users.findIndex(user => user.username === userId);
    AuthorizationRepositoryMock.users.splice(index, 1);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateUserPassword(_userId: string, _password: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async updateUserRoles(userId: string, roles: Role[]): Promise<void> {
    AuthorizationRepositoryMock.userRoles[userId] = roles.map(role => ({
      name: role,
      id: role,
      description: role,
    }));
  }
  async findRolesByUserId(userId: string): Promise<Keycloak.RoleRepresentation[]> {
    return AuthorizationRepositoryMock.userRoles[userId] ?? [];
  }
  async userHasCredentials(userId: string): Promise<boolean> {
    return AuthorizationRepositoryMock.userRoles[userId] !== undefined;
  }
}
