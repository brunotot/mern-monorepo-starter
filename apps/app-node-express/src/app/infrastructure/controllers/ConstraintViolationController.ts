import type { ConstraintViolationService } from "@/app/infrastructure/service/ConstraintViolationService";
import type { RouteInput, RouteOutput } from "@/lib/@ts-rest";
import { contracts } from "@org/lib-api-client";
import { contract } from "@/app/infrastructure/decorators";
import { autowired, inject } from "@/lib/ioc";

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
