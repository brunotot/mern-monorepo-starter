import { z, type zod } from "@org/lib-commons";

/**
 * @see {@link https://www.keycloak.org/docs-api/22.0.1/rest-api/index.html#UserRepresentation @keycloak/UserRepresentation }
 */
export const UserRepresentation = z.object({
  id: z.string().optional(),
  username: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  enabled: z.boolean(),
});

export type UserRepresentation = zod.infer<typeof UserRepresentation>;
