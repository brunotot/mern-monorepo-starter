import type { TODO, PaginationResult } from "@org/shared";
import type { Db, Document as MongoDocument } from "mongodb";

import { Environment } from "@org/backend/config";
import type {
  MongoFilters,
  MongoSearch,
  MongoSort,
  MongoPaginationOptions,
} from "@org/backend/types";
import { type PaginableRepository } from "@org/backend/infrastructure/repository/interface/PaginableRepository";
import app from "@org/backend/worker";

export abstract class MongoRepository<T extends MongoDocument> implements PaginableRepository<T> {
  #db: Db;
  readonly #name: string;

  get db() {
    if (this.#db) return this.#db;
    this.#db = app.mongoClient.db(Environment.getInstance().vars.DB_DATABASE);
    return this.#db;
  }

  constructor(name: string) {
    const lowerCaseName = name.toLowerCase();
    this.#name = lowerCaseName.endsWith("s") ? lowerCaseName : `${lowerCaseName}s`;
  }

  protected get collection() {
    return this.db.collection<T>(this.#name);
  }

  // prettier-ignore
  async search(options?: MongoPaginationOptions): Promise<PaginationResult<T>> {
    const limit = options?.limit ?? 10;
    const page = options?.page ?? 0;
    const search = options?.search ?? { fields: [], regex: "" };
    const sort = options?.sort ?? [];
    const filters = options?.filters ?? {};
    const skip = page * limit;

    const pipeline: TODO[] = [];

    pipeline.push(...this.buildMatchPipeline(search, filters));
    pipeline.push(...this.buildSortPipeline(sort));

    pipeline.push(...[
      { $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        count: [{ $count: 'totalElements' }]
      }},
      { $unwind: "$count" },
      { $project: {
        _id: false,    // Excludes the _id field from the output
        data: true,    // Includes the data field in the output
        totalElements: "$count.totalElements",
        totalPages: { $ceil: { $divide: ["$count.totalElements", limit] } },
        rowsPerPage: { $convert: { input: `${limit}`, to: "int" } },
        page: { $convert: { input: `${page}`, to: "int" } }
      }}
    ]);

    const aggregation = this.collection.aggregate(pipeline);
    const arrayResult = await aggregation.toArray();
    return arrayResult[0] ? arrayResult[0] as PaginationResult<T> : {
      data: [],
      totalElements: 0,
      totalPages: 0,
      rowsPerPage: limit,
      page,
    };
  }

  private buildSearchCondition({ fields, regex, options = "i" }: MongoSearch) {
    return {
      $or: fields.map(field => ({ [field]: { $regex: regex, $options: options } })),
    };
  }

  private buildFilterConditions(filters: MongoFilters) {
    return Object.entries(filters).map(([key, value]) => ({ [key]: value }));
  }

  private buildMatchPipeline(search: MongoSearch, filters: MongoFilters) {
    const $and: TODO[] = [];
    const useSearch = search.fields.length > 0 && search.regex;
    const useFilter = Object.keys(filters).length > 0;

    if (useSearch) {
      $and.push(this.buildSearchCondition(search));
    }

    if (useFilter) {
      $and.push(...this.buildFilterConditions(filters));
    }

    if (useSearch || useFilter) {
      return [{ $match: { $and } }];
    }

    return [];
  }

  private buildSortPipeline(sort: MongoSort = []) {
    if (sort.length === 0) return [];

    return [
      {
        $sort: sort.reduce(
          (acc, [field, order]) => ({ ...acc, [field]: order === "asc" ? 1 : -1 }),
          {},
        ),
      },
    ];
  }
}
