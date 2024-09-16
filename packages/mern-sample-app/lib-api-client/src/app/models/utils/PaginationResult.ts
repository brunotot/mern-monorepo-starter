import { zod, zodAny, type z as zodTypes } from "@org/lib-commons";
const z = zod();

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
export type PaginationResult = zodTypes.infer<typeof PaginationResult>;
