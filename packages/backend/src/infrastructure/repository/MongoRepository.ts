import type { TODO } from "@org/shared";
import type { Db, Document as MongoDocument } from "mongodb";

import {
  type PaginationResult,
  type PaginationOptions,
  type PaginableRepository,
  Environment,
  MongoClient,
  buildMatchPipeline,
  buildSortPipeline,
} from "@internal";

export abstract class MongoRepository<T extends MongoDocument> implements PaginableRepository<T> {
  readonly #db: Db;
  readonly #name: string;

  constructor(name: string) {
    this.#db = MongoClient.getInstance().db(Environment.getInstance().vars.DB_DATABASE);
    const lowerCaseName = name.toLowerCase();
    this.#name = lowerCaseName.endsWith("s") ? lowerCaseName : `${lowerCaseName}s`;
  }

  protected get collection() {
    return this.#db.collection<T>(this.#name);
  }

  // prettier-ignore
  async search(options?: PaginationOptions): Promise<PaginationResult<T>> {
    const limit = options?.limit ?? 10;
    const page = options?.page ?? 0;
    const search = options?.search ?? { fields: [], regex: "" };
    const sort = options?.sort ?? [];
    const filters = options?.filters ?? {};
    const skip = page * limit;

    const pipeline: TODO[] = [];

    pipeline.push(...buildMatchPipeline(search, filters));
    pipeline.push(...buildSortPipeline(sort));

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
}
