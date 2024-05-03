import { Repository /*, Transactional*/ } from "@org/backend/decorators";
import { ObjectId, ErrorLog } from "@org/shared";

import { MongoRepository } from "@org/backend/infrastructure/repository/MongoRepository";
import { type ErrorLogRepository } from "@org/backend/infrastructure/repository/interface/ErrorLogRepository";

@Repository(ErrorLog)
export class ErrorLogRepositoryImpl
  extends MongoRepository<ErrorLog>
  implements ErrorLogRepository
{
  //@Transactional()
  async insertOne(user: Omit<ErrorLog, "_id">): Promise<ErrorLog> {
    const candidate = { ...user, _id: new ObjectId() };
    const { insertedId } = await this.collection.insertOne(candidate);
    return { ...candidate, _id: insertedId };
  }
}
