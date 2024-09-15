import { z } from "zod";
import { zodAny } from "../config";

/** @hidden */
export const BasePageableResponseDto = z
  .object({
    data: z.array(zodAny()),
    totalPages: z.number().openapi({ example: 75 }),
    totalElements: z.number().openapi({ example: 741 }),
    rowsPerPage: z.number().openapi({ example: 10 }),
    page: z.number().openapi({ example: 0 }),
  })
  .describe("PageableResponseDto");

/** @hidden */
export function PageableResponseDto<T extends z.AnyZodObject>(schema: T) {
  return BasePageableResponseDto.extend({
    data: z.array(schema),
  })
    .describe("")
    .openapi({ title: `${PageableResponseDto.name}(${schema.description})` });
}

/** @hidden */
export type PaginationResult<T> = {
  data: T[];
  totalPages: number;
  totalElements: number;
  rowsPerPage: number;
  page: number;
};

// TODO Move all user related stuff to lib-api-client/app

/** @hidden */
export const UserPageableResponseDto = PageableResponseDto(
  z.object({
    id: z.string(),
    username: z.string(),
    roles: z.array(z.union([z.literal("admin"), z.literal("user")])),
  }),
);

export type UserPageableResponseDto = z.infer<typeof UserPageableResponseDto>;

/** @hidden */
export function JsonQueryParam<Schema extends z.Schema>(schema: Schema) {
  return z.string().transform(val => {
    const result = JSON.parse(val) as z.infer<typeof schema>;
    return schema.parse(result);
  });
}

/** @hidden */
export const PaginationOptions = z.object({
  page: z.number().default(0),
  rowsPerPage: z.number().default(10),
  order: z.array(z.string()).default([]),
  search: z.string().default(""),
  filters: zodAny().default({}),
});

/** @hidden */
export type PaginationOptions = z.infer<typeof PaginationOptions>;
