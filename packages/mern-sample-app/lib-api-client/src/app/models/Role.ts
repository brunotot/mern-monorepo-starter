import { z } from "zod";

// prettier-ignore
export const Role = z.union([
  z.literal("admin"), 
  z.literal("user"),
]);

export type Role = z.infer<typeof Role>;
