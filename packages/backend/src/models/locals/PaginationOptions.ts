import { type MongoFilters } from "@models/locals/MongoFilters";
import { type MongoSearch } from "@models/locals/MongoSearch";
import { type MongoSort } from "@models/locals/MongoSort";

export type PaginationOptions = {
  filters: MongoFilters;
  search: MongoSearch;
  sort: MongoSort;
  page: number;
  limit: number;
};
