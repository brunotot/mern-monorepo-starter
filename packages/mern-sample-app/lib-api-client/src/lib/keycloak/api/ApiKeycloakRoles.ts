import { zod, type z as zodTypes } from "@org/lib-commons";
const z = zod();

export const ApiKeycloakRoles = z.array(z.object({ name: z.string() }));

export type ApiKeycloakRoles = zodTypes.infer<typeof ApiKeycloakRoles>;
