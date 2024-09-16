import { z, type zod } from "@org/lib-commons";

// prettier-ignore
export const Role = z.union([
  z.literal("admin"), 
  z.literal("user"),
]);

export type Role = zod.infer<typeof Role>;
