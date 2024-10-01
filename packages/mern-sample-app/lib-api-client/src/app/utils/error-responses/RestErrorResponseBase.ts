import { z } from "@org/lib-commons";

import { RestErrorResponse } from "./RestErrorResponse";

export function RestErrorResponseBase(status: number, message: string) {
  return RestErrorResponse.extend({
    status: z.number().openapi({
      example: status,
    }),
    message: z.string().openapi({
      example: message,
    }),
  }).describe(message);
}
