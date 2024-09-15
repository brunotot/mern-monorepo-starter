import { type User } from "@org/lib-api-client";

export interface AuthorizationRepository {
  findAllUsers(): Promise<User[]>;
  findRolesByUserId(id: string): Promise<string[]>;
  findUserByUsername(username: string): Promise<User | null>;
}
