import { z, type zod } from "@org/lib-commons";

export const KcUserRole = z.enum(["avr-admin", "avr-user"]);

export type KcUserRole = zod.infer<typeof KcUserRole>;

export const ROLE_LIST = KcUserRole.options;
