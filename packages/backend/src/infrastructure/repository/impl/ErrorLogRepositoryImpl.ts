import { Repository /*, Transactional*/ } from "@decorators";
import { ErrorLog } from "@domain";
import { ObjectId } from "mongodb";

import { MongoRepository } from "@infrastructure/repository/MongoRepository";
import { type ErrorLogRepository } from "@infrastructure/repository/interface/ErrorLogRepository";

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
