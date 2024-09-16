import { zod, type z as zodTypes } from "@org/lib-commons";
import { ApiKeycloakUser } from "../../lib";
const z = zod();

export const User = ApiKeycloakUser.extend({
  roles: z.array(z.string()),
});

export type User = zodTypes.infer<typeof User>;
