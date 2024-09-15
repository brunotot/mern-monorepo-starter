import { z } from "zod";
import { ApiKeycloakUser } from "../../lib";

export const User = ApiKeycloakUser.extend({
  roles: z.array(z.string()),
});

export type User = z.infer<typeof User>;
