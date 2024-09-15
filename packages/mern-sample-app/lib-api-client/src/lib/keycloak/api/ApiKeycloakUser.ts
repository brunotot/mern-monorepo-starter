import { z } from "zod";

export const ApiKeycloakUser = z.object({
  id: z.string(),
  username: z.string(),
});

export type ApiKeycloakUser = z.infer<typeof ApiKeycloakUser>;
