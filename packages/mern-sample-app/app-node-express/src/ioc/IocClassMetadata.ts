import type { DecoratorMetadataInjectType } from "@org/app-node-express/meta";

import { DecoratorMetadataEntry } from "@org/app-node-express/meta";

export class IocClassMetadata extends DecoratorMetadataEntry<{
  name: string;
  dependencies: string[];
}> {
  public static getInstance(injection: DecoratorMetadataInjectType) {
    return new IocClassMetadata(injection);
  }

  private constructor(injection: DecoratorMetadataInjectType) {
    super(injection, () => ({
      name: "",
      dependencies: [],
    }));
  }

  public getName() {
    return this.value.name.toLowerCase();
  }

  public getDependencies() {
    return this.value.dependencies;
  }

  public setName(name: string) {
    this.value.name = name;
  }

  public addDependency(name: string) {
    this.value.dependencies.push(name);
  }
}
