import type { zod, TODO } from "@org/lib-commons";

import { z } from "@org/lib-commons";

import { PaginationResponse } from "./PaginationResponse";

/** @hidden */
export function TypedPaginationResponse<const T extends zod.AnyZodObject>(schema: T) {
  return PaginationResponse.extend({
    data: z.array(schema),
  });
}

/** @hidden */
export type TypedPaginationResponse<T = TODO> = Omit<PaginationResponse, "data"> & {
  data: T[];
};
