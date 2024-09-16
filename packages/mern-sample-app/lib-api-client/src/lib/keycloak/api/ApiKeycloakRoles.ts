import { z, type zod } from "@org/lib-commons";

export const ApiKeycloakRoles = z.array(z.object({ name: z.string() }));

export type ApiKeycloakRoles = zod.infer<typeof ApiKeycloakRoles>;
