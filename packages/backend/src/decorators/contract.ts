import { type TODO } from "@org/shared";
import { ErrorLogRepository } from "@org/backend/infrastructure/repository/impl/ErrorLogRepository";
import type { AppRouteImplementation } from "@ts-rest/express";
import type { AppRoute, ServerInferResponses } from "@ts-rest/core";
import { injectClass, ServiceRegistry } from "@org/backend/config/singletons/ServiceRegistry";
import {
  RouterCollection,
  type RouteMiddleware,
} from "@org/backend/config/singletons/RouterCollection";
import { DatabaseManager } from "@org/backend/config/managers/DatabaseManager";
import { type KeycloakRole, withSecured } from "@org/backend/infrastructure/middleware/withSecured";
import { getTypedError } from "@org/backend/config/utils/ErrorResponseUtils";

export type RouteOutput<Route extends AppRoute> = Promise<ServerInferResponses<Route>>;

export type RouteInput<Route extends AppRoute> = Parameters<AppRouteImplementation<Route>>[0];

export type RouteHandler<Route extends AppRoute> = (data: RouteInput<Route>) => RouteOutput<Route>;

export type RouteMiddlewareDecoratorParam = RouteMiddleware | RouteMiddleware[];

export function contract<const Route extends AppRoute, This, Fn extends RouteHandler<Route>>(
  routeContractData: { contract: Route; roles?: KeycloakRole[] },
  ...middlewareData: RouteMiddlewareDecoratorParam[]
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
        const container = ServiceRegistry.getInstance().inject(context);
        const result = await target.call(container, data);
        await DatabaseManager.getInstance().commitTransaction(session);
        return result;
      } catch (error: unknown) {
        await DatabaseManager.getInstance().rollbackTransaction(session);
        const typedError = getTypedError(error);
        await injectClass(ErrorLogRepository).insertOne(typedError.content);
        return { status: 500, body: typedError.content };
      } finally {
        session.endSession();
      }
    }

    routeContract.summary = buildContractSummary(routeContract.summary, roles);
    RouterCollection.getInstance().addRouter(routeContract, handler, middleware);
    return handler as Fn;
  };
}

function buildContractSummary(plainSummary: string = "", roles: string[]) {
  return (plainSummary ?? "") + " " + roles.map(role => `[role:${role}]`).join(" ");
}
