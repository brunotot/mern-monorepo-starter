import type { TODO, zod } from "@org/lib-commons";

import { z } from "@org/lib-commons";

export const ValidatorOptions = z.object({
  groups: z.array(z.string()),
});

export type ValidatorOptions = zod.infer<typeof ValidatorOptions>;

export const Validator = z.function(z.tuple([z.any(), ValidatorOptions]), z.promise(z.boolean()));

export type Validator<T = TODO> = (model: T, options: ValidatorOptions) => Promise<boolean>;

export const Validators = z.record(z.string(), Validator);

export type Validators<T = TODO> = T extends never ? never : Record<string, Validator<T>>;

export type ConstraintViolationExecOptions = {
  body: TODO;
  options: ValidatorOptions;
  schemaPath: string;
};
