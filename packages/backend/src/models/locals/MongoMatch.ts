import { z } from "zod";
import { MongoSearch } from "@models/locals/MongoSearch";
import { MongoFilters } from "@models/locals/MongoFilters";

export const MongoMatch = z.object({
  search: MongoSearch,
  filters: MongoFilters,
});

export type MongoMatch = z.infer<typeof MongoMatch>;
