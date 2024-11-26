import type { DecoratorMetadataInject } from "@org/lib-decorators";
import { DecoratorMetadataEntry } from "@org/lib-decorators";

export class IocClassMetadata extends DecoratorMetadataEntry<{
  name: string;
  dependencies: string[];
}> {
  public static getInstance(injection: DecoratorMetadataInject) {
    return new IocClassMetadata(injection);
  }

  private constructor(injection: DecoratorMetadataInject) {
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
