import type { Class } from "@org/shared";
import type { SwaggerTag } from "@internal";

import { Injectable, RouteDecoratorManager, Swagger } from "@internal";

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
