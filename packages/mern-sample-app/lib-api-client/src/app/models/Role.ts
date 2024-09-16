import { zod, type z as zodTypes } from "@org/lib-commons";
const z = zod();

// prettier-ignore
export const Role = z.union([
  z.literal("admin"), 
  z.literal("user"),
]);

export type Role = zodTypes.infer<typeof Role>;
