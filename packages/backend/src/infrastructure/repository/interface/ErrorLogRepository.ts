import type { ErrorLog } from "@models";

export interface ErrorLogRepository {
  insertOne: (user: Omit<ErrorLog, "_id">) => Promise<ErrorLog>;
}
