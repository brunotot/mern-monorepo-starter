import { type PaginationOptions, type PaginationResult, type User } from "@internal";

export interface UserService {
  search: (options?: PaginationOptions) => Promise<PaginationResult<User>>;
  findAll: () => Promise<User[]>;
  create: (user: User) => Promise<User>;
}
