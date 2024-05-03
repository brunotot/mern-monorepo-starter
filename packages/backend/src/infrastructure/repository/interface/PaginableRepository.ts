import { type PaginationResult } from "@org/shared";
import { type MongoPaginationOptions } from "@org/backend/types";

export interface PaginableRepository<T> {
  search: (options?: MongoPaginationOptions) => Promise<PaginationResult<T>>;
}
