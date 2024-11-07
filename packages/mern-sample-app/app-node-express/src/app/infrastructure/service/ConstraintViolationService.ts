import type { Validator, Validators } from "@org/lib-api-client";
import type { TODO } from "@org/lib-commons";

import { VALIDATORS } from "@org/app-node-express/app/infrastructure/validators";
import { inject } from "@org/app-node-express/lib/ioc";

@inject("ConstraintViolationService")
export class ConstraintViolationService {
  async validate(model: TODO, schemaPath: string, groups: string[]): Promise<boolean> {
    const [schema, action] = schemaPath.split(".");

    let validators: TODO = VALIDATORS;
    if (action === undefined) {
      validators = validators[schema];
    } else {
      validators = validators[schema][action];
    }

    if (typeof validators === "function") {
      return await validators(model, { groups });
    }

    validators = validators as Validators;
    for (const [, validator] of Object.entries(validators)) {
      if (!(await (validator as Validator)(model, { groups }))) {
        return false;
      }
    }

    return true;
  }
}
