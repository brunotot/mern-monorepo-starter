import type { zod } from "../lib/zod";

import { zodAny } from "./CommonUtils";
import { JsonQueryParam } from "./JsonQueryParam";
import { z } from "../lib/zod";

/** @hidden */
export const PaginationOptions = z.object({
  page: z.number().default(0),
  rowsPerPage: z.number().default(10),
  order: z.array(z.string()).default([]),
  search: z.string().default(""),
  filters: zodAny().default({}),
});

/** @hidden */
export type PaginationOptions = zod.infer<typeof PaginationOptions>;

export const PaginationOptionsQueryParam = JsonQueryParam(PaginationOptions).openapi({
  example: JSON.stringify({
    order: ["username asc", "email desc"],
    page: 0,
    rowsPerPage: 10,
    search: "john doe",
    filters: {},
  } satisfies PaginationOptions),
});
