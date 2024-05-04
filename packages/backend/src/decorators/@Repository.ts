import type { Class } from "@org/shared";
import type z from "zod";

import { InjectorMetadataManager } from "@org/backend/config";
import { Injectable } from "@org/backend/decorators/@Injectable";

export function Repository<This extends Class>(zodSchema: z.AnyZodObject) {
  const modelName = zodSchema.description;
  return Injectable<This>(data => {
    const context = data.meta.context;
    InjectorMetadataManager.getBy(context).setConstructorParams([modelName]);
  });
}
