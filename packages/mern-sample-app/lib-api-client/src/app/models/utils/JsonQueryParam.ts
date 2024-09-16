import { z, type zod } from "@org/lib-commons";

/** @hidden */
export function JsonQueryParam<T extends zod.Schema>(schema: T) {
  return z.string().transform(val => {
    const result = JSON.parse(val) as zod.infer<typeof schema>;
    return schema.parse(result);
  });
}

/** @hidden */
export type JsonQueryParam = unknown;
