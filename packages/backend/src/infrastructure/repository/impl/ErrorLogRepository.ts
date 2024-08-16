import {} from /*, Transactional*/ "@org/backend/decorators/transactional";
import { ObjectId, ErrorLog } from "@org/shared";
import { Repository } from "@org/backend/infrastructure/repository/Repository";

export class ErrorLogRepository extends Repository<ErrorLog> {
  constructor() {
    super(ErrorLog);
  }

  //@Transactional()
  async insertOne(user: Omit<ErrorLog, "_id">): Promise<ErrorLog> {
    const candidate = { ...user, _id: new ObjectId() };
    const { insertedId } = await this.collection.insertOne(candidate);
    return { ...candidate, _id: insertedId };
  }

  async findAll(): Promise<ErrorLog[]> {
    return await this.collection.find().toArray();
  }
}
