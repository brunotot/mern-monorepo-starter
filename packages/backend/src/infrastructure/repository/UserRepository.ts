import type { PaginationOptions, PaginationResult, User } from "@org/shared";

export interface UserRepository {
  deleteByUsername(username: string): Promise<void>;
  search: (options: PaginationOptions) => Promise<PaginationResult<User>>;
  findOneByUsername: (username: string) => Promise<User | null>;
  findOneByRefreshTokens: (refreshTokens: string[]) => Promise<User | null>;
  findAll: () => Promise<User[]>;
  insertOne: (user: Omit<User, "_id">) => Promise<User>;
  updateOne: (user: User) => Promise<User>;
}
