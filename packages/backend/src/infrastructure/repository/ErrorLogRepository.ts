import { type ErrorLog } from "@org/shared";
import { type PaginableRepository } from "@org/backend/infrastructure/repository/PaginableRepository";

export interface ErrorLogRepository extends PaginableRepository<ErrorLog> {
  insertOne: (user: Omit<ErrorLog, "_id">) => Promise<ErrorLog>;
}
