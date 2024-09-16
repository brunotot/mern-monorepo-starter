import { z, type zod } from "@org/lib-commons";
import { ApiKeycloakUser } from "../../lib";

export const User = ApiKeycloakUser.extend({
  roles: z.array(z.string()),
});

export type User = zod.infer<typeof User>;
