import { z, type zod } from "@org/lib-commons";

export const ApiKeycloakLogin = z.object({
  access_token: z.string(),
  expires_in: z.number(),
});

export type ApiKeycloakLogin = zod.infer<typeof ApiKeycloakLogin>;
