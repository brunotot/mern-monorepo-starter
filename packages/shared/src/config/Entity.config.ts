import { z } from "zod";
import { ObjectId } from "./Types.config";

export const BASE_ENTITY_SCHEMA = {
  _id: z.instanceof(ObjectId).optional(),
} as const satisfies z.ZodRawShape;

export function Entity<const T extends z.ZodRawShape>(
  name: string,
  shape: T,
): z.ZodObject<T & typeof BASE_ENTITY_SCHEMA> {
  return z
    .object({
      ...BASE_ENTITY_SCHEMA,
      ...shape,
    })
    .describe(name);
}

export type Entity<T extends z.AnyZodObject> = z.infer<T & typeof BASE_ENTITY_SCHEMA>;
