import { z, type zod } from "@org/lib-commons";

/**
 * @see {@link https://www.keycloak.org/docs-api/latest/rest-api/index.html#UserRepresentation @keycloak/UserRepresentation }
 */
export const UserRepresentation = z.object({
  id: z.string().optional(),
  username: z.string().min(1),
  firstName: z.string().default(""),
  lastName: z.string().default(""),
  email: z
    .string()
    .default("")
    .refine(value => value === "" || /\S+@\S+\.\S+/.test(value), "Invalid email"),
  enabled: z.boolean().default(true),
});

export type UserRepresentation = zod.infer<typeof UserRepresentation>;
