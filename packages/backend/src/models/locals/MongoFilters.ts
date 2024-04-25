import { z } from "zod";

export const MongoFilters = z.record(z.any());

export type MongoFilters = z.infer<typeof MongoFilters>;
