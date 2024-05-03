import type { ErrorLog } from "@org/shared";

export interface ErrorLogRepository {
  insertOne: (user: Omit<ErrorLog, "_id">) => Promise<ErrorLog>;
}
