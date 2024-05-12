import { type TODO, ErrorResponse } from "@org/shared";
import type { RequestHandler } from "express";
import type { AnyZodObject, ZodErrorMap, ZodIssue } from "zod";
import { getErrorMap } from "zod";
import { type ErrorLogRepository } from "@org/backend/infrastructure/repository/ErrorLogRepository";
import { ServiceRegistry } from "@org/backend/config";

export function withValidatedBody(schema: AnyZodObject): RequestHandler {
  return async (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e) {
      const issues = (e as TODO).issues as ZodIssue[];
      const formatPath = (path: (string | number)[]) => {
        const maxIndex = path.length - 1;
        return path.reduce((acc, curr, i) => {
          const isString = typeof curr === "string";
          const successorExists = i < maxIndex;
          const successorType = successorExists ? typeof path[i + 1] : undefined;
          const isSuccessorString = successorType === "string";
          const shouldAppendDot = successorExists && isSuccessorString;
          return `${acc}` + (isString ? `${curr}` : `[${curr}]`) + (shouldAppendDot ? "." : "");
        }, "");
      };

      const errorMapper: ZodErrorMap = getErrorMap();

      const errorDict = issues.reduce(
        (acc, issue) => ({
          ...acc,
          [formatPath(issue.path)]: errorMapper(issue, {
            defaultError: issue.message,
            data: req.body,
          }).message,
        }),
        {} as Record<string, TODO>,
      );
      const formattedErrors = Object.keys(errorDict)
        .sort(customSort)
        .map(key => `[${key}] ${errorDict[key]}`);

      // eslint-disable-next-line no-inner-declarations
      function customSort(a: string, b: string) {
        // Split the paths into segments based on either dots or square brackets
        const regex = /\.|\[|\]/;
        const segmentsA = a.split(regex).filter(Boolean); // remove any empty strings from results
        const segmentsB = b.split(regex).filter(Boolean);

        // Compare each segment individually
        for (let i = 0; i < Math.min(segmentsA.length, segmentsB.length); i++) {
          const segmentA = segmentsA[i];
          const segmentB = segmentsB[i];

          // Check if both segments are numeric
          const isNumericA = !isNaN(parseInt(segmentA));
          const isNumericB = !isNaN(parseInt(segmentB));

          if (isNumericA && isNumericB) {
            // Both segments are numbers, compare them numerically
            const numA = parseInt(segmentA);
            const numB = parseInt(segmentB);
            if (numA !== numB) {
              return numA - numB;
            }
          } else if (!isNumericA && !isNumericB) {
            // Both segments are non-numbers, compare them lexicographically
            if (segmentA < segmentB) return -1;
            if (segmentA > segmentB) return 1;
          } else {
            // One is a number and the other is not: numbers always sort earlier
            return isNumericA ? -1 : 1;
          }
        }

        // If all corresponding segments are the same but one path is longer than the other
        return segmentsA.length - segmentsB.length;
      }

      const errorResponse = new ErrorResponse(
        req.originalUrl,
        400,
        "Request body validation error",
        {
          errors: formattedErrors,
        },
      );
      const errorLogRepository =
        ServiceRegistry.getInstance().inject<ErrorLogRepository>("errorLogRepository");
      const content = errorResponse.content;
      await errorLogRepository.insertOne(content);
      res.status(content.status).json(content);
    }
  };
}
