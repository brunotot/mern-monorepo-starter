import { type PaginationOptions, type PaginationResult } from "@internal";

export interface PaginableRepository<T> {
  search: (options?: PaginationOptions) => Promise<PaginationResult<T>>;
}
