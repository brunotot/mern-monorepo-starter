import type { PaginationOptions, PaginationResult } from "@org/lib-api-client";
import type { zod, TODO } from "@org/lib-commons";
import type * as mongodb from "mongodb";

import type { MongoFilters, MongoSort, MongoSearch } from "./MongoTypes";
import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb/MongoDatabaseService";
import { getSession } from "@org/app-node-express/config/SessionStorage";

export abstract class MongoRepository<T extends mongodb.Document> {
  private readonly schema: zod.Schema<T>;
  private readonly searchFields: string[];

  constructor(schema: zod.Schema<T>, searchFields: string[] = []) {
    this.schema = schema;
    this.searchFields = searchFields;
  }

  private get session(): mongodb.ClientSession {
    return process.env.SERVER_ENV === "test"
      ? MongoDatabaseService.getInstance().testSession
      : getSession().mongoClientSession;
  }

  private get collection() {
    return MongoDatabaseService.getInstance().collection(this.schema);
  }

  public async findAll(): Promise<mongodb.WithId<T>[]> {
    return await this.collection.find().toArray();
  }

  public async findOne(doc: Parameters<mongodb.Collection<T>["findOne"]>[0]) {
    return await this.collection.findOne(doc, { session: this.session });
  }

  public async insertOne(doc: mongodb.OptionalUnlessRequiredId<T>): Promise<T> {
    const candidate = { ...doc };
    const { insertedId } = await this.collection.insertOne(candidate, {
      session: this.session,
    });
    return { ...candidate, _id: insertedId } as T;
  }

  public async updateOne(doc: T): Promise<T> {
    await this.collection.updateOne({ _id: doc._id }, doc);
    return doc;
  }

  public async deleteOne(doc: Parameters<mongodb.Collection<T>["deleteOne"]>[0]): Promise<void> {
    await this.collection.deleteOne(doc, { session: this.session });
  }

  /* Pagination */

  public async findAllPaginated(options?: PaginationOptions): Promise<PaginationResult> {
    return this.paginate(this.collection, this.searchFields, options);
  }

  private async paginate(
    collection: mongodb.Collection<T>,
    searchFields: string[],
    options?: PaginationOptions,
  ): Promise<PaginationResult> {
    const limit = options?.rowsPerPage ?? 0;
    const page = options?.page ?? 0;
    const search = options?.search ?? "";
    const order = options?.order ?? [];
    const filters = options?.filters ?? {};
    const skip = page * limit;

    const pipeline: mongodb.Document[] = [];

    pipeline.push(...this.buildMatchPipeline({ fields: searchFields, regex: search }, filters));
    pipeline.push(
      ...this.buildSortPipeline(
        order.map((s: TODO) => {
          const [field, sortOrder] = s.split(" ");
          return [field, sortOrder as "asc" | "desc"];
        }),
      ),
    );

    pipeline.push(
      ...[
        {
          $facet: {
            data: [{ $skip: skip }, { $limit: limit }],
            count: [{ $count: "totalElements" }],
          },
        },
        { $unwind: "$count" },
        {
          $project: {
            _id: false, // Excludes the _id field from the output
            data: true, // Includes the data field in the output
            totalElements: "$count.totalElements",
            totalPages: { $ceil: { $divide: ["$count.totalElements", limit] } },
            rowsPerPage: { $convert: { input: `${limit}`, to: "int" } },
            page: { $convert: { input: `${page}`, to: "int" } },
          },
        },
      ],
    );

    const aggregation = collection.aggregate(pipeline);
    const arrayResult = await aggregation.toArray();
    return arrayResult[0]
      ? (arrayResult[0] as PaginationResult)
      : {
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
    const $and: unknown[] = [];
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
