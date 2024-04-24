import { type PaginationOptions } from "@infrastructure/repository/impl/UserRepositoryImpl";
import { type PaginationResult, type User } from "@domain";

export interface UserService {
  search: (options?: PaginationOptions) => Promise<PaginationResult<User>>;
  findAll: () => Promise<User[]>;
  create: (user: User) => Promise<User>;
}
