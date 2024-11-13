import type { UserService } from "../service/UserService";
import type { UserForm, Validator, Validators } from "@org/lib-api-client";

import { IocRegistry } from "@org/app-node-express/lib";
import { RestError } from "@org/lib-api-client";

// Returns false if validation success

export const usernameShouldBeUnique: Validator<UserForm> = async (model, options) => {
  if (options.groups && !options.groups.includes("create")) return true;
  const userService = IocRegistry.getInstance().inject<UserService>("UserService");
  try {
    await userService.findOneByUsername(model.username);
    return false;
  } catch (error: unknown) {
    if (error instanceof RestError && error.content.status === 404) {
      return true;
    }
    throw error;
  }
};

export const UserValidators = {
  usernameShouldBeUnique,
} as const satisfies Validators<UserForm>;
