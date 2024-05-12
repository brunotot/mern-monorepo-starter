import { Autowired, Injectable /*, Transactional*/ } from "@org/backend/decorators";
import { ObjectId, ErrorLog, type PaginationResult } from "@org/shared";
import { type ErrorLogRepository } from "@org/backend/infrastructure/repository/ErrorLogRepository";
import { type Database } from "@org/backend/infrastructure/components/Database";
import { type MongoPaginationOptions } from "@org/backend/types";
import * as PaginationUtils from "@org/backend/infrastructure/utils/PaginationUtils";

@Injectable("errorLogRepository")
export class ErrorLogRepositoryImpl implements ErrorLogRepository {
  @Autowired() private database: Database;

  private get collection() {
    return this.database.collection(ErrorLog);
  }

  search(options?: MongoPaginationOptions): Promise<PaginationResult<ErrorLog>> {
    return PaginationUtils.paginate(this.collection, options);
  }

  //@Transactional()
  async insertOne(user: Omit<ErrorLog, "_id">): Promise<ErrorLog> {
    const candidate = { ...user, _id: new ObjectId() };
    const { insertedId } = await this.collection.insertOne(candidate);
    return { ...candidate, _id: insertedId };
  }
}
