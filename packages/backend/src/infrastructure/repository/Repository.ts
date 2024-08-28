import { type AnyZodObject, type ZodSchema } from "zod";
import { DatabaseManager } from "@org/backend/config/DatabaseManager.config";
import { type TODO, type PaginationOptions } from "@org/shared";
import { type PaginationResult } from "@org/shared";
import type { ClientSession, Collection, WithId } from "mongodb";
import { type Entity } from "@org/shared";
import { getRequestContext } from "@org/backend/config/RequestContext.config";
import type { MongoFilters, MongoSearch, MongoSort } from "@org/backend/config/MongoDB.config";

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
      ? DatabaseManager.getInstance().testSession
      : getRequestContext<ClientSession>("session")!;
    return session;
  }

  private get collection() {
    return DatabaseManager.getInstance().collection(this.schema);
  }

  public async findAll(): Promise<WithId<T>[]> {
    return await this.collection.find().toArray();
  }

  public async findOne(doc: Parameters<Collection<T>["findOne"]>[0]) {
    return await this.collection.findOne(doc, { session: this.session });
  }

  public async insertOne(doc: Omit<T, "_id">): Promise<T> {
    const candidate = { ...doc };
    const { insertedId } = await this.collection.insertOne(candidate as TODO, {
      session: this.session,
    });
    return { ...candidate, _id: insertedId } as unknown as T;
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
    collection: Collection<TODO>,
    searchFields: string[],
    options?: PaginationOptions,
  ): Promise<PaginationResult<TODO>> {
    const limit = options?.rowsPerPage ?? 0;
    const page = options?.page ?? 0;
    const search = options?.search ?? "";
    const order = options?.order ?? [];
    const filters = options?.filters ?? {};
    const skip = page * limit;

    const pipeline: TODO[] = [];

    pipeline.push(...this.buildMatchPipeline({ fields: searchFields, regex: search }, filters));
    pipeline.push(
      ...this.buildSortPipeline(
        order.map(s => {
          const [field, sortOrder] = s.split(" ");
          return [field, sortOrder as "asc" | "desc"];
        }) as TODO,
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
      ? (arrayResult[0] as PaginationResult<TODO>)
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
