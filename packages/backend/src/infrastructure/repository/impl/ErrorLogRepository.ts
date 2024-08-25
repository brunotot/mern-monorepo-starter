import { ErrorLog } from "@org/shared";
import { Repository } from "@org/backend/infrastructure/repository/Repository";

export class ErrorLogRepository extends Repository<ErrorLog> {
  constructor() {
    super(ErrorLog);
  }
}
