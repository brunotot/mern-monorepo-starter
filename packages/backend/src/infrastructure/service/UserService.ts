import { type MongoPaginationOptions } from "@org/backend/types";
import { type User, type PaginationResult } from "@org/shared";

export interface UserService {
  search: (options?: MongoPaginationOptions) => Promise<PaginationResult<User>>;
  findAll: () => Promise<User[]>;
  create: (user: User) => Promise<User>;
}
