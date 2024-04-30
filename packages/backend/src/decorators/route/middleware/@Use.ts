import type { MethodDecoratorDef } from "@tsvdec/decorators";
import { createMethodDecorator } from "@tsvdec/decorators";

import { RouteDecoratorManager } from "@config";
import type { RouteHandler, RouteMiddleware } from "@models";

export function Use<This, Fn extends RouteHandler>(
  ...handlers: RouteMiddleware[]
): MethodDecoratorDef<This, Fn> {
  return createMethodDecorator<This, Fn>(({ meta }) => {
    const routeName = String(meta.context.name);
    const routeService = RouteDecoratorManager.from(meta.context);
    routeService.updateRoute(routeName, r => ({
      ...r,
      middlewares: [...(r.middlewares ?? []), ...handlers],
    }));
  });
}
