import { z, type zod } from "@org/lib-commons";

/**
 * @see {@link https://www.keycloak.org/docs-api/22.0.1/rest-api/index.html#RoleRepresentation @keycloak/RoleRepresentation }
 */
export const RoleRepresentation = z.object({
  name: z.string(),
  id: z.string().optional(),
  description: z.string().optional(),
});

export type RoleRepresentation = zod.infer<typeof RoleRepresentation>;
