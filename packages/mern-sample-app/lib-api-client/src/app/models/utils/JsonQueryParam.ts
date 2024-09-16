import { zod, type z as zodTypes } from "@org/lib-commons";
const z = zod();

/** @hidden */
export function JsonQueryParam<T extends zodTypes.Schema>(schema: T) {
  return z.string().transform(val => {
    const result = JSON.parse(val) as zodTypes.infer<typeof schema>;
    return schema.parse(result);
  });
}

/** @hidden */
export type JsonQueryParam = unknown;
