import type { TODO } from "@org/shared";

import type { MongoSearch, MongoFilters } from "@internal";
import { buildFilterConditions, buildSearchCondition } from "@internal";

export type MongoMatch = {
  search: MongoSearch;
  filters: MongoFilters;
};

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
