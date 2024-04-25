import { z } from "zod";

import { MongoFilters } from "@models/locals/MongoFilters";
import { MongoSearch } from "@models/locals/MongoSearch";
import { MongoSort } from "@models/locals/MongoSort";

export const PaginationOptions = z.object({
  filters: MongoFilters,
  search: MongoSearch,
  sort: MongoSort,
  page: z.number().default(0),
  limit: z.number().default(10),
});

export type PaginationOptions = z.infer<typeof PaginationOptions>;
