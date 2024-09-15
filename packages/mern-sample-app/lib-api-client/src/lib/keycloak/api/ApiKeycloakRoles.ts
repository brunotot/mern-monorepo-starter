import { z } from "zod";

export const ApiKeycloakRoles = z.array(z.object({ name: z.string() }));

export type ApiKeycloakRoles = z.infer<typeof ApiKeycloakRoles>;
