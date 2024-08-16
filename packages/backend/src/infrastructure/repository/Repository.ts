import { type ZodSchema } from "zod";
import { DatabaseManager } from "@org/backend/config/managers/DatabaseManager";
import { type TODO, type PaginationOptions } from "@org/shared";
import { type PaginationResult } from "@org/shared";
import type { Collection } from "mongodb";

export type MongoSort = [string, "asc" | "desc"][];

export type MongoFilters = Record<string, TODO>;

export type MongoSearch = {
  fields: string[];
  regex?: string;
  options?: string;
};

export abstract class Repository<T> {
  private readonly schema: ZodSchema<T>;
  private readonly searchFields: string[];

  constructor(schema: ZodSchema<T>, searchFields: string[] = []) {
    this.schema = schema;
    this.searchFields = searchFields;
  }

  protected get collection() {
    return DatabaseManager.getInstance().collection(this.schema);
  }

  /* Pagination */

  public async search(options?: PaginationOptions): Promise<PaginationResult<T>> {
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
