import type { ConstraintViolationService } from "@org/app-node-express/app/infrastructure/service/ConstraintViolationService";
import type { RouteInput, RouteOutput } from "@org/app-node-express/lib/@ts-rest";

import { contract } from "@org/app-node-express/app/infrastructure/decorators";
import { autowired, inject } from "@org/app-node-express/lib/ioc";
import { contracts } from "@org/lib-api-client";

@inject("ConstraintViolationController")
export class ConstraintViolationController {
  @autowired() private constraintViolationService: ConstraintViolationService;

  @contract(contracts.ConstraintViolation.validate)
  async validate(
    payload: RouteInput<typeof contracts.ConstraintViolation.validate>,
  ): RouteOutput<typeof contracts.ConstraintViolation.validate> {
    return {
      status: 200,
      body: await this.constraintViolationService.validate(
        payload.body,
        payload.query.schemaPath,
        payload.query.options.groups,
      ),
    };
  }
}
