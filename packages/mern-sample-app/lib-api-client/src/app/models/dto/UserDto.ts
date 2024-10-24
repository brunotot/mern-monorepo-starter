import type { zod } from "@org/lib-commons";

import { z } from "@org/lib-commons";

import { User } from "../domain/User";

export const UserDto = User.extend({
  roles: z.array(z.string()),
  hasCredentials: z.boolean(),
}).openapi({
  title: "User DTO",
  description: "User DTO",
});

export type UserDto = zod.infer<typeof UserDto>;
