import { z, zodAny, type zod } from "@org/lib-commons";

/** @hidden */
export const PaginationResponse = z.object({
  data: z.array(zodAny()),
  totalPages: z.number().openapi({ example: 75 }),
  totalElements: z.number().openapi({ example: 741 }),
  rowsPerPage: z.number().openapi({ example: 10 }),
  page: z.number().openapi({ example: 0 }),
});

/** @hidden */
export type PaginationResponse = zod.infer<typeof PaginationResponse>;
