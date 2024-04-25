import z from "zod";

import { Swagger } from "@config";

const BasePageableResponseDto = z
  .object({
    data: z.array(z.any()),
    totalPages: z.number().openapi({ example: 75 }),
    totalElements: z.number().openapi({ example: 741 }),
    rowsPerPage: z.number().openapi({ example: 10 }),
    page: z.number().openapi({ example: 0 }),
  })
  .describe("PageableResponseDto");

Swagger.getInstance().registerSchema("PageableResponseDto", BasePageableResponseDto);

export function PageableResponseDto<T extends z.AnyZodObject>(schema: T) {
  return BasePageableResponseDto.extend({
    data: z.array(schema).openapi({
      items: { ...Swagger.getInstance().getRefData(schema) },
    }),
  })
    .describe("")
    .openapi({ title: `${PageableResponseDto.name}(${schema.description})` });
}

export type PaginationResult<T> = {
  data: T[];
  totalPages: number;
  totalElements: number;
  rowsPerPage: number;
  page: number;
};
