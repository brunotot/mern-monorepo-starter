import type { Class } from "@org/shared";

import { RouteDecoratorManager, Swagger, type SwaggerTag } from "@config";
import { Injectable } from "@decorators";

export function Controller<This extends Class>(
  basePath: string,
  swaggerTag: Omit<SwaggerTag, "name"> = {},
) {
  return Injectable<This>((context, constructor) => {
    const swaggerTagName = String(context.name!);
    Swagger.getInstance().registerTag({
      constructor,
      name: swaggerTagName,
      ...swaggerTag,
    });
    RouteDecoratorManager.from(context).setBasePath(basePath);
  });
}
