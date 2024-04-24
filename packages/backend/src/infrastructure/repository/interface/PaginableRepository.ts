import { type PaginationResult } from "@domain";
import { type PaginationOptions } from "@infrastructure/repository/impl/UserRepositoryImpl";

export interface PaginableRepository<T> {
  search: (options?: PaginationOptions) => Promise<PaginationResult<T>>;
}
