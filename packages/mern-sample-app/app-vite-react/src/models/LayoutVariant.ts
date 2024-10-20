import { z, type zod } from "@org/lib-commons";

export const LayoutVariant = z.enum(["HorizontalLayout", "SidebarLayout"]);

export type LayoutVariant = zod.infer<typeof LayoutVariant>;
