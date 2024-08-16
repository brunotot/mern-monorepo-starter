import { PaginationOptions } from "@org/shared";

export function buildPaginationQueryParams(paginationOptions: PaginationOptions): {
  paginationOptions: string;
} {
  return { paginationOptions: JSON.stringify(paginationOptions) };
}
