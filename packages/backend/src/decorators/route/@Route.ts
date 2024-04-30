import type { TODO } from "@org/shared";
import type { Request, Response } from "express";
import HttpStatus from "http-status";
import { createMethodDecorator } from "@tsvdec/decorators";
import { Bottle, Logger, RouteDecoratorManager, Swagger } from "@config";
import { ErrorLog } from "@models";
import { type ErrorLogRepository } from "@infrastructure";
import { ErrorResponse } from "@errors";
import type { RouteHandler, HttpResponseStatus, RouteProps } from "@models";

function getRouteErrorStatuses(routeFnSource: string): HttpResponseStatus[] {
  function extractErrorStatusCodes(input: string): string[] {
    const pattern = /res\.sendError\(\s*([\w.]+)\s*[),]/g;
    let matches: RegExpExecArray | null;
    const statusCodes: string[] = [];

    while ((matches = pattern.exec(input)) !== null) {
      statusCodes.push(matches[1]);
    }

    return statusCodes;
  }
  const statusCodesSet = new Set<HttpResponseStatus>();
  const statusCodes = extractErrorStatusCodes(routeFnSource);
  statusCodes.forEach(t => statusCodesSet.add(eval(t)));
  return [...statusCodesSet] as HttpResponseStatus[];
}

export function Route<This, Fn extends RouteHandler>(props: RouteProps) {
  const swagger = props.swagger ?? {};
  return createMethodDecorator<This, Fn>(({ target, meta }) => {
    const context = meta.context;
    const routeErrorStatuses = getRouteErrorStatuses(target.toString());

    async function handler(req: Request, res: Response) {
      try {
        return await target.call(Bottle.getInstance().inject(context), req, res);
      } catch (error) {
        const errorResponse =
          error instanceof ErrorResponse
            ? error
            : new ErrorResponse(req, HttpStatus.INTERNAL_SERVER_ERROR, (error as TODO).message);
        const errorContent = errorResponse.content;
        const errorLogRepository =
          Bottle.getInstance().inject<ErrorLogRepository>("errorLogRepository");
        try {
          await errorLogRepository.insertOne(errorContent);
        } catch (error) {
          Logger.getInstance().logger.error("Error logging failed", error);
        }
        return res.status(errorContent.status).json(errorContent);
      }
    }

    RouteDecoratorManager.from(context).addRoute({
      ...props,
      name: String(context.name),
      middlewares: [],
      handler,
      swagger: {
        ...swagger,
        responses: {
          ...(swagger.responses ?? {}),
          ...routeErrorStatuses.reduce(
            (acc, status) => ({
              ...acc,
              [status]: { description: HttpStatus[`${status}_MESSAGE`] },
            }),
            {},
          ),
          [HttpStatus.INTERNAL_SERVER_ERROR]: {
            description: HttpStatus["500_MESSAGE"],
          },
          default: {
            description:
              "This response is used across all API endpoints to provide a standardized error payload whenever an error occurs. It ensures consistent error handling and format throughout the API.",
            content: Swagger.getInstance().buildSwaggerBody(ErrorLog).content,
          },
        },
      },
    });

    return handler as Fn;
  });
}
