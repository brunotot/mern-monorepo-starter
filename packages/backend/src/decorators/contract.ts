import { type ContractName, type ContractResolver, type TODO, ErrorResponse } from "@org/shared";
import { type ErrorLogRepository } from "@org/backend/infrastructure/repository/impl/ErrorLogRepository";
import type { AppRouteImplementation } from "@ts-rest/express";
import type { ServerInferResponses } from "@ts-rest/core";
import { ServiceRegistry } from "@org/backend/config/singletons/ServiceRegistry";
import {
  RouterCollection,
  type RouteMiddleware,
} from "@org/backend/config/singletons/RouterCollection";
import { Logger } from "@org/backend/config/singletons/Logger";

export type RouteOutput<Name extends ContractName> = Promise<
  ServerInferResponses<ContractResolver<Name>>
>;

export type RouteInput<Name extends ContractName> = Parameters<
  AppRouteImplementation<ContractResolver<Name>>
>[0];

export type RouteHandler<Name extends ContractName> = (data: RouteInput<Name>) => RouteOutput<Name>;

export type RouteMiddlewareDecoratorParam = RouteMiddleware | RouteMiddleware[];

export function contract<
  const RouteName extends ContractName,
  This,
  Fn extends RouteHandler<RouteName>,
>(routeName: RouteName, ...middleware: RouteMiddlewareDecoratorParam[]) {
  return function (target: Fn, context: ClassMethodDecoratorContext<This, Fn>) {
    async function handler(data: TODO): Promise<TODO> {
      try {
        const container = ServiceRegistry.getInstance().inject(context);
        return await target.call(container, data);
      } catch (error) {
        const errorResponse =
          error instanceof ErrorResponse
            ? error
            : new ErrorResponse(data.req, 500, (error as TODO).message);
        const errorContent = errorResponse.content;
        const errorLogRepository =
          ServiceRegistry.getInstance().inject<ErrorLogRepository>("errorLogRepository");

        try {
          await errorLogRepository.insertOne(errorContent);
        } catch (error) {
          Logger.getInstance().logger.error("Error logging failed", error);
        }
        return { status: 500, body: errorContent };
      }
    }

    RouterCollection.getInstance().addRouter(routeName, handler, middleware.flat());

    return handler as Fn;
  };
}
