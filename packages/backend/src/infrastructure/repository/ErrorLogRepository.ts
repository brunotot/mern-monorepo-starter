import type { PaginationOptions, PaginationResult, ErrorLog } from "@org/shared";

export interface ErrorLogRepository {
  search: (options: PaginationOptions) => Promise<PaginationResult<ErrorLog>>;
  insertOne: (user: Omit<ErrorLog, "_id">) => Promise<ErrorLog>;
}
