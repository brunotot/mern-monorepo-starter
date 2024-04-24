import type { Class } from "@org/shared";
import type z from "zod";

import { InjectionDecoratorManager } from "@config";
import { Injectable } from "@decorators/ioc/@Injectable";

export function Repository<This extends Class>(zodSchema: z.AnyZodObject) {
  const modelName = zodSchema.description;
  return Injectable<This>(context => {
    InjectionDecoratorManager.from(context).setConstructorParams([modelName]);
  });
}
