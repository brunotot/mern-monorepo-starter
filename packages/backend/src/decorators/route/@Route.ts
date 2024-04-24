import type { TODO } from "@org/shared";
import type { Request, Response } from "express";
import type {
  ErrorLogRepository,
  RequestMappingProps,
  RouteHandler,
  HttpStatusNumeric,
  SwaggerPath,
} from "@internal";

import HttpStatus from "http-status";
import { createMethodDecorator } from "@tsvdec/decorators";
import { Bottle, ErrorLog, ErrorResponse, RouteDecoratorManager, Swagger } from "@internal";

export type RouteProps = Omit<RequestMappingProps, "name" | "middlewares"> & {
  swagger?: SwaggerPath;
};

function getRouteErrorStatuses(routeFnSource: string): HttpStatusNumeric[] {
  function extractErrorStatusCodes(input: string): string[] {
    const pattern = /res\.sendError\(\s*([\w.]+)\s*[),]/g;
    let matches: RegExpExecArray | null;
    const statusCodes: string[] = [];

    while ((matches = pattern.exec(input)) !== null) {
      statusCodes.push(matches[1]);
    }

    return statusCodes;
  }
  const statusCodesSet = new Set<HttpStatusNumeric>();
  const statusCodes = extractErrorStatusCodes(routeFnSource);
  statusCodes.forEach(t => statusCodesSet.add(eval(t)));
  return [...statusCodesSet] as HttpStatusNumeric[];
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
        await errorLogRepository.insertOne(errorContent);
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
