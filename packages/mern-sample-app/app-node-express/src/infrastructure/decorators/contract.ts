import type { AppRoute } from "@ts-rest/core";

import { IocRegistry } from "@org/app-node-express/ioc";
import * as TsRest from "@org/app-node-express/lib/@ts-rest";
import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb";
import { getTypedError } from "@org/lib-api-client";

export function contract<const Route extends AppRoute, This, Fn extends TsRest.RouteHandler<Route>>(
  contract: Route,
  ...middlewareData: (TsRest.RouteMiddlewareFactory | TsRest.RouteMiddlewareFactory[])[]
) {
  const middlewareFactories = middlewareData.flat();

  return function (target: Fn, context: ClassMethodDecoratorContext<This, Fn>) {
    async function handler(data: unknown): Promise<unknown> {
      const databaseService = MongoDatabaseService.getInstance();
      const session = databaseService.client.startSession();
      try {
        databaseService.startTransaction(session);
        const container = IocRegistry.getInstance().inject(context);
        const result = await target.call(container, data as TsRest.RouteInput<Route>);
        await databaseService.commitTransaction(session);
        return result;
      } catch (error: unknown) {
        await databaseService.rollbackTransaction(session);
        const typedError = getTypedError(error);
        return { status: typedError.content.status, body: typedError.content };
      } finally {
        session.endSession();
      }
    }

    TsRest.TsRestRouterService.getInstance().addRouter(contract, handler, middlewareFactories);
    return handler as Fn;
  };
}
