/**
 * @packageDocumentation
 */

import type { VALIDATORS } from "../validators";
import type { RouteMiddlewareFactory } from "@/lib/@ts-rest";
import type { RequestHandler } from "express";
import { RestError, type ValidatorOptions, type Validators } from "@org/lib-api-client";
import { IocRegistry, inject } from "@/lib/ioc";

const IOC_KEY = "withValidatedBody";

export type ValidatorSchema = keyof typeof VALIDATORS;

export interface ValidatedBodyMiddleware {
  middleware(validators: Validators, options: ValidatorOptions): RequestHandler[];
}

@inject(IOC_KEY)
export class WithValidatedBody implements ValidatedBodyMiddleware {
  middleware(validators: Validators, options: ValidatorOptions): RequestHandler[] {
    return [
      async (req, _res, next) => {
        const body = req.body || undefined;
        if (!body) return next();
        const validatorEntries = Object.entries(validators);
        const validationResults = await Promise.all(
          validatorEntries.map(([, validate]) => validate(body, options)),
        );
        const hasErrors = validationResults.some(res => !res);
        if (hasErrors) return next(new RestError(400, "Body validation failed"));
        next();
      },
    ];
  }
}

export function withValidatedBody(
  validators: Validators,
  options: ValidatorOptions = { groups: [] },
): RouteMiddlewareFactory {
  return () => {
    return IocRegistry.getInstance()
      .inject<ValidatedBodyMiddleware>(IOC_KEY)
      .middleware(validators, options);
  };
}
