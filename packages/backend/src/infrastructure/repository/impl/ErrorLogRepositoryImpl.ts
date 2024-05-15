import { Injectable /*, Transactional*/ } from "@org/backend/decorators";
import { ObjectId, ErrorLog } from "@org/shared";
import { type ErrorLogRepository } from "@org/backend/infrastructure/repository/ErrorLogRepository";
import { AbstractRepository } from "@org/backend/infrastructure/repository/AbstractRepository";

@Injectable("errorLogRepository")
export class ErrorLogRepositoryImpl
  extends AbstractRepository<ErrorLog>
  implements ErrorLogRepository
{
  constructor() {
    super(ErrorLog);
  }

  //@Transactional()
  async insertOne(user: Omit<ErrorLog, "_id">): Promise<ErrorLog> {
    const candidate = { ...user, _id: new ObjectId() };
    const { insertedId } = await this.collection.insertOne(candidate);
    return { ...candidate, _id: insertedId };
  }
}
