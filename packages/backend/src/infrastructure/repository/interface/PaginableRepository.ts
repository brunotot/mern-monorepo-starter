import { type PaginationResult } from "@domain";
import { type PaginationOptions } from "@infrastructure";

export interface PaginableRepository<T> {
  search: (options?: PaginationOptions) => Promise<PaginationResult<T>>;
}
