import { z, zodAny, type zod } from "@org/lib-commons";

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
