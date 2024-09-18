import { z, type zod } from "@org/lib-commons";

export const ApiKeycloakUser = z.object({
  id: z.string(),
  username: z.string(),
  realmRoles: z.array(z.string()),
});

export type ApiKeycloakUser = zod.infer<typeof ApiKeycloakUser>;
