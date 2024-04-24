import { Repository /*, Transactional*/ } from "@decorators";
import { ErrorLog } from "@domain";
import { type ErrorLogRepository, MongoRepository } from "@infrastructure";
import { ObjectId } from "mongodb";

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
