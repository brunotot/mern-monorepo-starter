import { z, type zod } from "@org/lib-commons";

export const Locale = z.enum(["en", "hr"]);

export type Locale = zod.infer<typeof Locale>;