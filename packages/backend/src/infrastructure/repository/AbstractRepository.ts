import { type ZodSchema } from "zod";
import { DatabaseManager } from "@org/backend/config";
import { type PaginationOptions } from "@org/shared";
import { type PaginationResult } from "@org/shared";
import * as PaginationUtils from "@org/backend/infrastructure/utils/PaginationUtils";

export abstract class AbstractRepository<T> {
  private readonly schema: ZodSchema<T>;
  private readonly searchFields: string[];

  constructor(schema: ZodSchema<T>) {
    this.schema = schema;
    this.searchFields = this.buildSearch();
  }

  abstract buildSearch(): string[];

  protected get collection() {
    return DatabaseManager.getInstance().collection(this.schema);
  }

  async search(options?: PaginationOptions): Promise<PaginationResult<T>> {
    return PaginationUtils.paginate(this.collection, this.searchFields, options);
  }
}
