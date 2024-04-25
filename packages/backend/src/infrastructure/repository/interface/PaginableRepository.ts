import { type PaginationResult, type PaginationOptions } from "@models";

export interface PaginableRepository<T> {
  search: (options?: PaginationOptions) => Promise<PaginationResult<T>>;
}
