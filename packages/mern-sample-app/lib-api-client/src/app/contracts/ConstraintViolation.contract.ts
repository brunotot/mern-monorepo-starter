import { z } from "@org/lib-commons";

import { routeCommonProps, zodResponse, initContract } from "../../lib/@ts-rest";
import { JsonQueryParam } from "../utils";
import { ValidatorOptions } from "../utils/common-models";
import * as errors from "../utils/error-responses";

const routeDefaults = routeCommonProps({
  groupName: "Constraint Violations",
  contextPath: "/constraint-violations",
});

export const constraintViolationContract = initContract().router({
  validate: {
    ...routeDefaults({
      path: "/validate",
      method: "POST",
    }),
    summary: "Create constraintViolation",
    description: `Create new constraintViolation`,
    query: z.object({
      schemaPath: z.string(),
      options: JsonQueryParam(ValidatorOptions),
    }),
    body: z.any(),
    responses: {
      200: zodResponse(z.boolean(), "Validation result"),
      500: zodResponse(errors.RestErrorResponse500, "Unhandled server error"),
    },
  },
});
