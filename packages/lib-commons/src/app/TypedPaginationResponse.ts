import type { TODO } from "./CommonUtils";
import type { zod } from "../lib/zod";

import { PaginationResponse } from "./PaginationResponse";
import { z } from "../lib/zod";

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
