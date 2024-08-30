import { ErrorLog } from "@org/lib-commons";
import { Repository } from "@org/app-node-express/infrastructure/repository/Repository";

export class ErrorLogRepository extends Repository<ErrorLog> {
  constructor() {
    super(ErrorLog);
  }
}
