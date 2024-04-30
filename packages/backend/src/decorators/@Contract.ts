import { createMethodDecorator } from "@tsvdec/decorators";
import { Bottle, ContractManager, Logger } from "@config";
import { type ContractName, type TODO } from "@org/shared";
import { type ErrorLogRepository } from "@infrastructure";
import { ErrorResponse } from "@errors";
import HttpStatus from "http-status";
import { type RouteMiddleware, type RouteHandler } from "@models";

export function Contract<const Name extends ContractName, This, Fn extends RouteHandler<Name>>(
  routeName: Name,
  ...middleware: RouteMiddleware[]
) {
  return createMethodDecorator<This, Fn>(({ target, meta }) => {
    async function handler(data: TODO): Promise<TODO> {
      const context = meta.context;
      try {
        return await target.call(Bottle.getInstance().inject(context), data);
      } catch (error) {
        const errorResponse =
          error instanceof ErrorResponse
            ? error
            : new ErrorResponse(
                data.req,
                HttpStatus.INTERNAL_SERVER_ERROR,
                (error as TODO).message,
              );
        const errorContent = errorResponse.content;
        const errorLogRepository =
          Bottle.getInstance().inject<ErrorLogRepository>("errorLogRepository");
        try {
          await errorLogRepository.insertOne(errorContent);
        } catch (error) {
          Logger.getInstance().logger.error("Error logging failed", error);
        }
        //return res.status(errorContent.status).json(errorContent);
        return errorContent;
      }
    }

    ContractManager.getInstance().addRouter(routeName, handler, middleware);

    return handler as Fn;
  });
}
