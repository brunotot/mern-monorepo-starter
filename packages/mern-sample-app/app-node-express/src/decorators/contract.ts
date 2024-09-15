import type { AppRoute } from "@ts-rest/core";
import { iocRegistry } from "@org/app-node-express/lib/bottlejs";
import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb";
import { withSecured } from "@org/app-node-express/infrastructure/middleware/withSecured";
import { getTypedError, type Role } from "@org/lib-api-client";
import type { RequestHandler } from "express";
import {
  type RouteHandler,
  type RouteInput,
  TsRestRouterService,
} from "@org/app-node-express/lib/@ts-rest";

export function contract<const Route extends AppRoute, This, Fn extends RouteHandler<Route>>(
  routeContractData: { contract: Route; roles?: Role[] },
  ...middlewareData: (RequestHandler | RequestHandler[])[]
) {
  const routeContract = routeContractData.contract;
  const roles = routeContractData.roles ?? [];
  const middleware = (
    roles.length === 0 ? middlewareData : [withSecured(...roles), ...middlewareData]
  ).flat();

  return function (target: Fn, context: ClassMethodDecoratorContext<This, Fn>) {
    async function handler(data: unknown): Promise<unknown> {
      const session = MongoDatabaseService.getInstance().client.startSession();
      try {
        MongoDatabaseService.getInstance().startTransaction(session);
        const container = iocRegistry.inject(context);
        const result = await target.call(container, data as RouteInput<Route>);
        await MongoDatabaseService.getInstance().commitTransaction(session);
        return result;
      } catch (error: unknown) {
        await MongoDatabaseService.getInstance().rollbackTransaction(session);
        const typedError = getTypedError(error);
        return { status: typedError.content.status, body: typedError.content };
      } finally {
        session.endSession();
      }
    }

    routeContract.summary = buildContractSummary(routeContract.summary, roles);
    TsRestRouterService.getInstance().addRouter(routeContract, handler, middleware);
    return handler as Fn;
  };
}

function buildContractSummary(plainSummary: string = "", roles: string[]) {
  return (plainSummary ?? "") + " " + roles.map(role => `[role:${role}]`).join(" ");
}
