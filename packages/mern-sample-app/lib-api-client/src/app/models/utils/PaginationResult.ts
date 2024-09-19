import { z, zodAny, type zod } from "@org/lib-commons";

/** @hidden */
export const PaginationResult = z
  .object({
    data: z.array(zodAny()),
    totalPages: z.number().openapi({ example: 75 }),
    totalElements: z.number().openapi({ example: 741 }),
    rowsPerPage: z.number().openapi({ example: 10 }),
    page: z.number().openapi({ example: 0 }),
  })
  .describe("PaginationResult");

/** @hidden */
export type PaginationResult = zod.infer<typeof PaginationResult>;
