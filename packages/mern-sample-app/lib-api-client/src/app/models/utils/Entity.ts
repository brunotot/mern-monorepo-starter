import { z, type zod } from "@org/lib-commons";

export function Entity<const T extends zod.ZodRawShape>(
  name: string,
  shape: T,
): zod.ZodObject<T & { _id: zod.ZodOptional<zod.ZodString> }> {
  if (!name) {
    throw new Error("entity name must not be blank");
  }

  return z
    .object({
      _id: z.string().optional(),
      ...shape,
    })
    .describe(name);
}

export type Entity<T extends object> = T & { _id?: string };
