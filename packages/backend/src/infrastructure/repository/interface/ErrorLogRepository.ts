import type { ErrorLog } from "@domain";

export interface ErrorLogRepository {
  insertOne: (user: Omit<ErrorLog, "_id">) => Promise<ErrorLog>;
}
