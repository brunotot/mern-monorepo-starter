import { z, type zod } from "@org/lib-commons";

export const Role = z.enum(["admin", "user"]).openapi({
  title: "Role",
  description: "User role defined in Keycloak",
});

export const ROLE_LIST = Role.options;

export type Role = zod.infer<typeof Role>;
