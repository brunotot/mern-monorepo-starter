import type { Class } from "@org/shared";

import { RouteDecoratorManager, Swagger } from "@config";
import { Injectable } from "@decorators/ioc/@Injectable";
import { type TagObject } from "openapi3-ts/oas31";

export function Controller<This extends Class>(
  basePath: string,
  swaggerTag: Omit<TagObject, "name"> = {},
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
