import type {
  RouteHandler,
  RouteInput,
  RouteMiddlewareFactory,
} from "@org/app-node-express/lib/@ts-rest";
import type { AppRoute } from "@ts-rest/core";

import { TsRestRouterService } from "@org/app-node-express/lib/@ts-rest";
import { IocRegistry } from "@org/app-node-express/lib/bottlejs";
import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb";
import { getTypedError } from "@org/lib-api-client";

export function contract<const Route extends AppRoute, This, Fn extends RouteHandler<Route>>(
  contract: Route,
  ...middlewareData: (RouteMiddlewareFactory | RouteMiddlewareFactory[])[]
) {
  const middlewareFactories = middlewareData.flat();

  return function (target: Fn, context: ClassMethodDecoratorContext<This, Fn>) {
    async function handler(data: unknown): Promise<unknown> {
      const databaseService = MongoDatabaseService.getInstance();
      const session = databaseService.client.startSession();
      try {
        databaseService.startTransaction(session);
        const container = IocRegistry.getInstance().inject(context);
        const result = await target.call(container, data as RouteInput<Route>);
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

    contract.summary = buildContractSummary(contract.summary);
    TsRestRouterService.getInstance().addRouter(contract, handler, middlewareFactories);
    return handler as Fn;
  };
}

function buildContractSummary(plainSummary: string = "" /*, roles: string[]*/) {
  // TODO Handle somewhen in the future
  const disableFeature = true;
  if (disableFeature) return plainSummary;
  //return (plainSummary ?? "") + " " + roles.map(role => `[role:${role}]`).join(" ");
}
