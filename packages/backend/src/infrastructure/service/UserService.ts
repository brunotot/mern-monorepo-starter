import { type User, type PaginationResult, type PaginationOptions } from "@org/shared";

export interface UserService {
  deleteByUsername(username: string): Promise<void>;
  search: (params: Partial<PaginationOptions>) => Promise<PaginationResult<User>>;
  findAll: () => Promise<User[]>;
  create: (user: User) => Promise<User>;
}
