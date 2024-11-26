import { z, type zod } from "@org/lib-commons";

/**
 * @see {@link https://www.keycloak.org/docs-api/latest/rest-api/index.html#CredentialRepresentation @keycloak/CredentialRepresentation }
 */
export const CredentialRepresentation = z.object({
  id: z.string().optional(),
  type: z.string().optional(),
});

export type CredentialRepresentation = zod.infer<typeof CredentialRepresentation>;
