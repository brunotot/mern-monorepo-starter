import { createMethodDecorator } from "@org/backend/decorators";
import { ServiceRegistry, RouterCollection, Logger } from "@org/backend/config";
import { type ContractName, type TODO, ErrorResponse } from "@org/shared";
import { type ErrorLogRepository } from "@org/backend/infrastructure";
import { type RouteMiddleware, type RouteHandler } from "@org/backend/types";

export function Contract<const Name extends ContractName, This, Fn extends RouteHandler<Name>>(
  routeName: Name,
  ...middleware: RouteMiddleware[]
) {
  return createMethodDecorator<This, Fn>(({ target, meta }) => {
    async function handler(data: TODO): Promise<TODO> {
      console.log("HEEEEEEEEEEEEEEY", ServiceRegistry.getInstance().container, target);
      const context = meta.context;
      try {
        console.log("Calling target route");
        console.log(target.name);
        const container = ServiceRegistry.getInstance().inject(context);
        console.log(container);
        return await target.call(container, data);
      } catch (error) {
        const errorResponse =
          error instanceof ErrorResponse
            ? error
            : new ErrorResponse(data.req, 500, (error as TODO).message);
        console.log(error);
        const errorContent = errorResponse.content;
        const errorLogRepository =
          ServiceRegistry.getInstance().inject<ErrorLogRepository>("errorLogRepository");

        console.log(JSON.stringify(errorResponse.content, null, 2));
        try {
          await errorLogRepository.insertOne(errorContent);
        } catch (error) {
          Logger.getInstance().logger.error("Error logging failed", error);
        }
        return { status: 500, body: errorContent };
      }
    }

    RouterCollection.getInstance().addRouter(routeName, handler, middleware);

    return handler as Fn;
  });
}
