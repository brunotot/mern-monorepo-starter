import { z } from "../config/Zod.config";
import { Role, Entity } from "../config";

/** @hidden */
export const User = Entity("User", {
  username: z.string().openapi({ example: "john_doe" }),
  password: z.string().openapi({ example: "password" }),
  email: z.string().email().openapi({ example: "john.doe@mail.com" }),
  roles: z.array(Role).openapi({ example: [Role.enum.USER, Role.enum.ADMIN] }),
  refreshToken: z.array(z.string()),
});

export type User = Entity<typeof User>;

/** @hidden */
export const BasePageableResponseDto = z
  .object({
    data: z.array(z.any()),
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

/** @hidden */
export const UserPageableResponseDto = PageableResponseDto(User);

export type UserPageableResponseDto = z.infer<typeof UserPageableResponseDto>;

/** @hidden */
export function JsonQueryParam<Schema extends z.Schema>(schema: Schema) {
  return z.string().transform(val => {
    console.log(val);
    const result = JSON.parse(val) as z.infer<typeof schema>;
    return result;
  });
}

/** @hidden */
export const PaginationOptions = z.object({
  page: z.number().default(0),
  rowsPerPage: z.number().default(10),
  order: z.array(z.string()).default([]),
  search: z.string().default(""),
  filters: z.any().default({}),
});

/** @hidden */
export type PaginationOptions = z.infer<typeof PaginationOptions>;
