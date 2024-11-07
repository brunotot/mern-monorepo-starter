import type { UserService } from "../service/UserService";
import type { UserForm, Validator, Validators } from "@org/lib-api-client";

import { IocRegistry } from "@org/app-node-express/lib";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const usernameShouldBeUnique: Validator<UserForm> = async (model, _options) => {
  const userService = IocRegistry.getInstance().inject<UserService>("UserService");
  try {
    return (await userService.findOneByUsername(model.username)) !== null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};

export const UserValidators = {
  usernameShouldBeUnique,
} as const satisfies Validators<UserForm>;
