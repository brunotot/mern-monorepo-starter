import { MethodDecoratorDef, createMethodDecorator } from "@tsvdec/decorators";
import {
  RouteDecoratorManager,
  RouteHandler,
  RouteMiddlewareHandler,
} from "../../managers/RouteDecoratorManager";

export function Use<This, Fn extends RouteHandler>(
  ...handlers: RouteMiddlewareHandler[]
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
