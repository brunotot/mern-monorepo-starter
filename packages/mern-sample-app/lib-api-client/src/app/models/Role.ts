import { z, type zod } from "@org/lib-commons";

export const ROLE_LIST = [z.literal("admin"), z.literal("user")] as const;

export const Role = z.union(ROLE_LIST).openapi({
  title: "Role",
  description: "User role defined in Keycloak",
});

export type Role = zod.infer<typeof Role>;
