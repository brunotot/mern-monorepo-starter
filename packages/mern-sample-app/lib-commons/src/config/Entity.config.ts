import { z } from "zod";

export const BASE_ENTITY_SCHEMA = {
  _id: z.instanceof(String).optional(),
} as const satisfies z.ZodRawShape;

// TODO Use Entity on User model from lib-api-client !!!

export function Entity<const T extends z.ZodRawShape>(
  name: string,
  shape: T,
): z.ZodObject<T & typeof BASE_ENTITY_SCHEMA> {
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

export type Entity<T extends z.AnyZodObject> = z.infer<T & typeof BASE_ENTITY_SCHEMA>;
