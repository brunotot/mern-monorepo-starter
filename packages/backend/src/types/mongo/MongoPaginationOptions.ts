import { type MongoFilters } from "./MongoFilters";
import { type MongoSearch } from "./MongoSearch";
import { type MongoSort } from "./MongoSort";

export type MongoPaginationOptions = Partial<{
  filters: MongoFilters;
  search: MongoSearch;
  sort: MongoSort;
  page: number;
  limit: number;
}>;
