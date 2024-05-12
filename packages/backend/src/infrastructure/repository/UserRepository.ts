import { type User } from "@org/shared";
import { type PaginableRepository } from "@org/backend/infrastructure/repository/PaginableRepository";

export interface UserRepository extends PaginableRepository<User> {
  findOneByUsername: (username: string) => Promise<User | null>;
  findOneByRefreshTokens: (refreshTokens: string[]) => Promise<User | null>;
  findAll: () => Promise<User[]>;
  insertOne: (user: Omit<User, "_id">) => Promise<User>;
  updateOne: (user: User) => Promise<User>;
}
