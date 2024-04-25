import { type PaginationResult, type User, type PaginationOptions } from "@models";

export interface UserService {
  search: (options?: PaginationOptions) => Promise<PaginationResult<User>>;
  findAll: () => Promise<User[]>;
  create: (user: User) => Promise<User>;
}
