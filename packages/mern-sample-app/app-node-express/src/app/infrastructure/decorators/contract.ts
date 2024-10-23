import type { RouteHandler, RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { AppRoute } from "@org/lib-api-client";

import { TsRestRouterService, createContractHandler } from "@org/app-node-express/lib/@ts-rest";

export function contract<const Route extends AppRoute, This, Fn extends RouteHandler<Route>>(
  contract: Route,
  ...middlewareData: (RouteMiddlewareFactory | RouteMiddlewareFactory[])[]
) {
  return function (target: Fn, context: ClassMethodDecoratorContext<This, Fn>) {
    const middleware = middlewareData.flat();
    const handler = createContractHandler({ contract, middleware, context, target });
    TsRestRouterService.getInstance().addRouter(contract, handler, middleware);
    return handler as Fn;
  };
}
