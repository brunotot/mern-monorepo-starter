import { z, type zod } from "@org/lib-commons";

export const LayoutWidth = z.union([
  z.literal("xs"),
  z.literal("sm"),
  z.literal("md"),
  z.literal("lg"),
  z.literal("xl"),
  z.literal(false),
]);

export type LayoutWidth = zod.infer<typeof LayoutWidth>;
