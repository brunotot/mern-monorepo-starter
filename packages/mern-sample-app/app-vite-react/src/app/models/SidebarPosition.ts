import { z, type zod } from "@org/lib-commons";

export const SidebarPosition = z.enum(["left", "right"]);

export type SidebarPosition = zod.infer<typeof SidebarPosition>;
