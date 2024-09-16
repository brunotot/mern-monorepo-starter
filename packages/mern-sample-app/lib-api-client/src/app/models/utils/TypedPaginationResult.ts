import { PaginationResult } from "./PaginationResult";
import { z, type zod } from "@org/lib-commons";

/** @hidden */
export function TypedPaginationResult<T extends zod.AnyZodObject>(schema: T) {
  return PaginationResult.extend({
    data: z.array(schema),
  })
    .describe("")
    .openapi({ title: `${TypedPaginationResult.name}(${schema.description})` });
}

/** @hidden */
export type TypedPaginationResult = PaginationResult;
