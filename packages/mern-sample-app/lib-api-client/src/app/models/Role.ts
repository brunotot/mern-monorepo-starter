import { z, type zod } from "@org/lib-commons";

export const ROLE_LIST = [z.literal("admin"), z.literal("user")] as const;

export const Role = z.union(ROLE_LIST);

export type Role = zod.infer<typeof Role>;
