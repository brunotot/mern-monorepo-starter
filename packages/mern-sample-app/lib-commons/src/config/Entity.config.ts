import { zod, type z as zodTypes } from "../lib";
const z = zod();

export const BASE_ENTITY_SCHEMA = {
  _id: z.instanceof(String).optional(),
} as const satisfies zodTypes.ZodRawShape;

// TODO Use Entity on User model from lib-api-client !!!

export function Entity<const T extends zodTypes.ZodRawShape>(
  name: string,
  shape: T,
): zodTypes.ZodObject<T & typeof BASE_ENTITY_SCHEMA> {
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

export type Entity<T extends zodTypes.AnyZodObject> = zodTypes.infer<T & typeof BASE_ENTITY_SCHEMA>;
