import { Class } from "@org/shared";
import { $SwaggerManager, SwaggerTag } from "../../config";
import { RouteDecoratorManager } from "../managers/RouteDecoratorManager";
import { Injectable } from "./@Injectable";

export function Controller<This extends Class>(
  basePath: string,
  swaggerTag: Omit<SwaggerTag, "name"> = {},
) {
  return Injectable<This>((context, constructor) => {
    const swaggerTagName = String(context.name!);
    $SwaggerManager.registerTag({
      constructor,
      name: swaggerTagName,
      ...swaggerTag,
    });
    RouteDecoratorManager.from(context).setBasePath(basePath);
  });
}
