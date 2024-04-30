import { createMethodDecorator } from "@tsvdec/decorators";
import { type AppRouteImplementation } from "@ts-rest/express";
import { type AppRoute, type ServerInferResponses } from "@ts-rest/core";
import { Bottle, ContractManager, Logger } from "@config";
import { ContractName, ResolveContract, type TODO } from "@org/shared";
import { ErrorLogRepository } from "@infrastructure";
import { ErrorResponse } from "@errors";
import HttpStatus from "http-status";

export type Input<Name extends ContractName> = AppRouteImplementation<ResolveContract<Name>>;
export type Output<Name extends ContractName> = Promise<
  ServerInferResponses<ResolveContract<Name>>
>;
export type RouteHandler2<Name extends ContractName> = (data: Input<Name>) => Output<Name>;

export function Contract<const Name extends ContractName, This, Fn extends RouteHandler2<Name>>(
  routeName: Name,
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

    ContractManager.getInstance().addRouter(routeName, handler);

    return handler as Fn;
  });
}
