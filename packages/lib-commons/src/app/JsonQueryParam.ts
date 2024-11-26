import { z, type zod } from "../lib/zod";

export function JsonQueryParam<T extends zod.Schema>(schema: T) {
  return z.string().transform(val => {
    const result = JSON.parse(val) as zod.infer<typeof schema>;
    return schema.parse(result);
  });
}
