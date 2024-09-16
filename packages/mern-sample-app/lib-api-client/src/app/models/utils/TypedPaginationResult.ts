import { zod, type z as zodTypes } from "@org/lib-commons";
import { PaginationResult } from "./PaginationResult";
const z = zod();

/** @hidden */
export function TypedPaginationResult<T extends zodTypes.AnyZodObject>(schema: T) {
  return PaginationResult.extend({
    data: z.array(schema),
  })
    .describe("")
    .openapi({ title: `${TypedPaginationResult.name}(${schema.description})` });
}

/** @hidden */
export type TypedPaginationResult = PaginationResult;
