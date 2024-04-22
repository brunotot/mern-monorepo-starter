import { Injectable } from "@internal";
import type { Class } from "@org/shared";
import type z from "zod";

export function Repository<This extends Class>(zodSchema: z.AnyZodObject) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const modelName = zodSchema.description;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Injectable<This>((_context, _constructor) => {
    //RouteDecoratorManager.from(context).setBasePath(basePath);
  });
}
