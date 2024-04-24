import type { TODO } from "@org/shared";

export type MongoFilters = Record<string, TODO>;

export function buildFilterConditions(filters: MongoFilters) {
  return Object.entries(filters).map(([key, value]) => ({ [key]: value }));
}
