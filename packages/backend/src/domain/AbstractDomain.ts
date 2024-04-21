import { registerSchema } from "@internal";
import type { Class } from "@org/shared";
import mongoose from "mongoose";
import type z from "zod";

export function makeDomain<T extends AbstractDomain>(domainConstructor: Class<T>) {
  const domain = new domainConstructor();
  domain.init();
  return domain;
}

export abstract class AbstractDomain {
  protected abstract zod: z.AnyZodObject;
  protected abstract schema: mongoose.Schema;

  constructor() {
    // NOOP
  }

  public get name(): string {
    if (!this.zod.description) throw new Error("Schema must have a description");
    return this.zod.description;
  }

  public get db() {
    return mongoose.models[this.name] || mongoose.model(this.name, this.schema);
  }

  init() {
    registerSchema(this.name, this.zod);
  }
}
