import type { ErrorLog } from "@internal";

export interface ErrorLogRepository {
  insertOne: (user: Omit<ErrorLog, "_id">) => Promise<ErrorLog>;
}
