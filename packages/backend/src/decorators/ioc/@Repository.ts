import type { Class } from "@org/shared";
import type z from "zod";

import { Injectable, InjectionDecoratorManager } from "@internal";

export function Repository<This extends Class>(zodSchema: z.AnyZodObject) {
  const modelName = zodSchema.description;
  return Injectable<This>(context => {
    InjectionDecoratorManager.from(context).setConstructorParams([modelName]);
  });
}
