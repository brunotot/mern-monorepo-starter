import type { MongoFilters, MongoSearch, MongoSort } from "@models";
import type { TODO } from "@org/shared";

export function buildSearchCondition({ fields, regex, options = "i" }: MongoSearch) {
  return {
    $or: fields.map(field => ({ [field]: { $regex: regex, $options: options } })),
  };
}

export function buildFilterConditions(filters: MongoFilters) {
  return Object.entries(filters).map(([key, value]) => ({ [key]: value }));
}

export function buildMatchPipeline(search: MongoSearch, filters: MongoFilters) {
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

export function buildSortPipeline(sort: MongoSort = []) {
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
