import type { TODO, PaginationResult } from "@org/shared";
import type { Collection } from "mongodb";
import type {
  MongoFilters,
  MongoSearch,
  MongoSort,
  MongoPaginationOptions,
} from "@org/backend/types";

export async function paginate(
  collection: Collection<TODO>,
  options?: MongoPaginationOptions,
): Promise<PaginationResult<TODO>> {
  const limit = options?.limit ?? 10;
  const page = options?.page ?? 0;
  const search = options?.search ?? { fields: [], regex: "" };
  const sort = options?.sort ?? [];
  const filters = options?.filters ?? {};
  const skip = page * limit;

  const pipeline: TODO[] = [];

  pipeline.push(...buildMatchPipeline(search, filters));
  pipeline.push(...buildSortPipeline(sort));

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

function buildSearchCondition({ fields, regex, options = "i" }: MongoSearch) {
  return {
    $or: fields.map(field => ({ [field]: { $regex: regex, $options: options } })),
  };
}

function buildFilterConditions(filters: MongoFilters) {
  return Object.entries(filters).map(([key, value]) => ({ [key]: value }));
}

function buildMatchPipeline(search: MongoSearch, filters: MongoFilters) {
  const $and: TODO[] = [];
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
