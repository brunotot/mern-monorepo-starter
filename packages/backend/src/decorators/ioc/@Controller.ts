import { Injectable, RouteDecoratorManager, registerTag } from "@internal";
import type { Class } from "@org/shared";
import type { SwaggerTag } from "@types";

export function Controller<This extends Class>(
  basePath: string,
  swaggerTag: Omit<SwaggerTag, "name"> = {},
) {
  return Injectable<This>((context, constructor) => {
    const swaggerTagName = String(context.name!);
    registerTag({
      constructor,
      name: swaggerTagName,
      ...swaggerTag,
    });
    RouteDecoratorManager.from(context).setBasePath(basePath);
  });
}
