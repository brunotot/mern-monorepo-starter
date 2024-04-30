import type { Class } from "@org/shared";
import type z from "zod";

import { InjectableManager } from "@config";
import { Injectable } from "@decorators/@Injectable";

export function Repository<This extends Class>(zodSchema: z.AnyZodObject) {
  const modelName = zodSchema.description;
  return Injectable<This>(context => {
    InjectableManager.from(context).setConstructorParams([modelName]);
  });
}
