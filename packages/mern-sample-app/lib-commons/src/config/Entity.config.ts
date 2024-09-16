import { z, type zod } from "../lib";

export const BASE_ENTITY_SCHEMA = {
  _id: z.instanceof(String).optional(),
} as const satisfies zod.ZodRawShape;

// TODO Use Entity on User model from lib-api-client !!!

export function Entity<const T extends zod.ZodRawShape>(
  name: string,
  shape: T,
): zod.ZodObject<T & typeof BASE_ENTITY_SCHEMA> {
  if (!name) {
    throw new Error("entity name must not be blank");
  }

  return z
    .object({
      ...BASE_ENTITY_SCHEMA,
      ...shape,
    })
    .describe(name);
}

export type Entity<T extends zod.AnyZodObject> = zod.infer<T & typeof BASE_ENTITY_SCHEMA>;
