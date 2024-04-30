import { type MongoSearch } from "@models/locals/MongoSearch";
import { type MongoFilters } from "@models/locals/MongoFilters";

export type MongoMatch = {
  search: MongoSearch;
  filters: MongoFilters;
};
