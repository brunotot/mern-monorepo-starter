import { type TODO } from "@org/shared";
import { ErrorLogRepository } from "@org/backend/infrastructure/repository/impl/ErrorLogRepository";
import type { AppRoute } from "@ts-rest/core";
import { iocRegistry } from "@org/backend/setup/registry.setup";
import { DatabaseManager } from "@org/backend/config/DatabaseManager.config";
import { type KeycloakRole, withSecured } from "@org/backend/infrastructure/middleware/withSecured";
import { getTypedError } from "@org/shared";
import type { RequestHandler } from "express";
import { type RouteHandler, RouteCollection } from "@org/backend/config/Route.config";

export function contract<const Route extends AppRoute, This, Fn extends RouteHandler<Route>>(
  routeContractData: { contract: Route; roles?: KeycloakRole[] },
  ...middlewareData: (RequestHandler | RequestHandler[])[]
) {
  const routeContract = routeContractData.contract;
  const roles = routeContractData.roles ?? [];
  const middleware = (
    roles.length === 0 ? middlewareData : [withSecured(...roles), ...middlewareData]
  ).flat();

  return function (target: Fn, context: ClassMethodDecoratorContext<This, Fn>) {
    async function handler(data: TODO): Promise<TODO> {
      const session = DatabaseManager.getInstance().client.startSession();
      try {
        DatabaseManager.getInstance().startTransaction(session);
        const container = iocRegistry.inject(context);
        const result = await target.call(container, data);
        await DatabaseManager.getInstance().commitTransaction(session);
        return result;
      } catch (error: unknown) {
        await DatabaseManager.getInstance().rollbackTransaction(session);
        const typedError = getTypedError(error);
        await iocRegistry
          .inject<ErrorLogRepository>(ErrorLogRepository.name)
          .insertOne(typedError.content);
        return { status: typedError.content.status, body: typedError.content };
      } finally {
        session.endSession();
      }
    }

    routeContract.summary = buildContractSummary(routeContract.summary, roles);
    RouteCollection.getInstance().addRouter(routeContract, handler, middleware);
    return handler as Fn;
  };
}

function buildContractSummary(plainSummary: string = "", roles: string[]) {
  return (plainSummary ?? "") + " " + roles.map(role => `[role:${role}]`).join(" ");
}
