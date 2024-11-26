import { z, type zod } from "@org/lib-commons";

export const Role = z.enum(["avr-admin", "avr-user"]);

export type Role = zod.infer<typeof Role>;

export const ROLE_LIST = Role.options;
