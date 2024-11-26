import type { ConstraintViolationExecOptions } from "@org/lib-api-client";

import { tsrClient } from "@org/app-vite-react/lib/@ts-rest";

export async function executeConstraintValidation({
  body,
  options,
  schemaPath,
}: ConstraintViolationExecOptions) {
  const res = await tsrClient.ConstraintViolation.validate({
    body,
    query: {
      schemaPath,
      options: JSON.stringify(options),
    },
  });
  return res.status !== 200 || !!res.body;
}
