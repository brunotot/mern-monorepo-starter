import { z, type zod } from "@org/lib-commons";

import { PaginationResult } from "./PaginationResult";

/** @hidden */
export function TypedPaginationResult<const T extends zod.AnyZodObject>(schema: T) {
  return PaginationResult.extend({
    data: z.array(schema),
  })
    .describe("")
    .openapi({ title: `${TypedPaginationResult.name}(${schema.description})` });
}

/** @hidden */
export type TypedPaginationResult = PaginationResult;
