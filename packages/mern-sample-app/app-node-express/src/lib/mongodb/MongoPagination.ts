import type {
  MongoSort,
  MongoSearch,
  MongoFilters,
} from "@org/app-node-express/lib/mongodb/MongoTypes";
import type { PaginationOptions, TypedPaginationResponse } from "@org/lib-api-client";
import type { TODO } from "@org/lib-commons";
import type * as mongodb from "mongodb";

export async function paginate<T extends mongodb.Document>(
  collection: mongodb.Collection<T>,
  searchFields: string[],
  options?: PaginationOptions,
): Promise<TypedPaginationResponse<T>> {
  const limit = options?.rowsPerPage ?? 0;
  const page = options?.page ?? 0;
  const search = options?.search ?? "";
  const order = options?.order ?? [];
  const filters = options?.filters ?? {};
  const skip = page * limit;

  const pipeline: mongodb.Document[] = [];

  pipeline.push(...buildMatchPipeline({ fields: searchFields, regex: search }, filters));
  pipeline.push(
    ...buildSortPipeline(
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
    ? (arrayResult[0] as TypedPaginationResponse<T>)
    : {
        data: [],
        totalElements: 0,
        totalPages: 0,
        rowsPerPage: limit,
        page,
      };
}

function buildSearchCondition({ fields, regex, options = "i" }: MongoSearch) {
  return {
    $or: fields.map(field => ({ [field]: { $regex: regex, $options: options } })),
  };
}

function buildFilterConditions(filters: MongoFilters) {
  return Object.entries(filters).map(([key, value]) => ({ [key]: value }));
}

function buildMatchPipeline(search: MongoSearch, filters: MongoFilters) {
  const $and: unknown[] = [];
  const useSearch = search.fields.length > 0 && search.regex;
  const useFilter = Object.keys(filters).length > 0;

  if (useSearch) {
    $and.push(buildSearchCondition(search));
  }

  if (useFilter) {
    $and.push(...buildFilterConditions(filters));
  }

  if (useSearch || useFilter) {
    return [{ $match: { $and } }];
  }

  return [];
}

function buildSortPipeline(sort: MongoSort = []) {
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
