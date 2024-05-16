import { type ZodSchema } from "zod";
import { DatabaseManager } from "@org/backend/config";
import { type PaginableRepository } from "@org/backend/infrastructure/repository/PaginableRepository";
import { type MongoPaginationOptions } from "@org/backend/types";
import { type PaginationResult } from "@org/shared";
import * as PaginationUtils from "@org/backend/infrastructure/utils/PaginationUtils";

export abstract class AbstractRepository<T> implements PaginableRepository<T> {
  private readonly schema: ZodSchema<T>;

  constructor(schema: ZodSchema<T>) {
    this.schema = schema;
  }

  protected get collection() {
    return DatabaseManager.getInstance().collection(this.schema);
  }

  async search(options?: MongoPaginationOptions): Promise<PaginationResult<T>> {
    return PaginationUtils.paginate(this.collection, options);
  }
}
