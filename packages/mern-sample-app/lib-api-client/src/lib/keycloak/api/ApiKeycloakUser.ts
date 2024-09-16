import { zod, type z as zodTypes } from "@org/lib-commons";
const z = zod();

export const ApiKeycloakUser = z.object({
  id: z.string(),
  username: z.string(),
});

export type ApiKeycloakUser = zodTypes.infer<typeof ApiKeycloakUser>;
