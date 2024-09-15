import { type AnyZodObject, type ZodSchema } from "zod";
import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb";
import { type PaginationOptions } from "@org/lib-commons";
import { type PaginationResult } from "@org/lib-commons";
import type {
  ClientSession,
  Collection,
  Document,
  OptionalUnlessRequiredId,
  WithId,
} from "mongodb";
import { type Entity } from "@org/lib-commons";
import type { MongoFilters, MongoSearch, MongoSort } from "@org/app-node-express/lib/mongodb";
import { getSession } from "@org/app-node-express/config/SessionStorage";

export abstract class Repository<T extends Entity<AnyZodObject>> {
  private readonly schema: ZodSchema<T>;
  private readonly searchFields: string[];

  constructor(schema: ZodSchema<T>, searchFields: string[] = []) {
    this.schema = schema;
    this.searchFields = searchFields;
  }

  protected get session(): ClientSession {
    const isFromTest = process.env.NODE_ENV === "test";

    const session = isFromTest
      ? MongoDatabaseService.getInstance().testSession
      : getSession().mongoClientSession;

    return session;
  }

  private get collection() {
    return MongoDatabaseService.getInstance().collection(this.schema);
  }

  public async findAll(): Promise<WithId<T>[]> {
    return await this.collection.find().toArray();
  }

  public async findOne(doc: Parameters<Collection<T>["findOne"]>[0]) {
    return await this.collection.findOne(doc, { session: this.session });
  }

  public async insertOne(doc: OptionalUnlessRequiredId<T>): Promise<T> {
    const candidate = { ...doc };
    const { insertedId } = await this.collection.insertOne(candidate, {
      session: this.session,
    });
    return { ...candidate, _id: insertedId } as T;
  }

  public async updateOne(newValue: T): Promise<T> {
    await this.collection.updateOne({ _id: newValue._id }, newValue);
    return newValue;
  }

  public async deleteOne(doc: Parameters<Collection<T>["deleteOne"]>[0]): Promise<void> {
    await this.collection.deleteOne(doc, { session: this.session });
  }

  /* Pagination */

  public async findAllPaginated(options?: PaginationOptions): Promise<PaginationResult<T>> {
    return this.paginate(this.collection, this.searchFields, options);
  }

  private async paginate(
    collection: Collection<T>,
    searchFields: string[],
    options?: PaginationOptions,
  ): Promise<PaginationResult<T>> {
    const limit = options?.rowsPerPage ?? 0;
    const page = options?.page ?? 0;
    const search = options?.search ?? "";
    const order = options?.order ?? [];
    const filters = options?.filters ?? {};
    const skip = page * limit;

    const pipeline: Document[] = [];

    pipeline.push(...this.buildMatchPipeline({ fields: searchFields, regex: search }, filters));
    pipeline.push(
      ...this.buildSortPipeline(
        order.map(s => {
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
      ? (arrayResult[0] as PaginationResult<T>)
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
