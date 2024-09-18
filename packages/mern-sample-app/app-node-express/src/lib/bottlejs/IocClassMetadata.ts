import type { DecoratorMetadataInjectType } from "@org/app-node-express/meta";
import type { NoArgsClass } from "@org/lib-commons";

import { DecoratorMetadataEntry } from "@org/app-node-express/meta";

export class IocClassMetadata extends DecoratorMetadataEntry<{
  name: string;
  dependencies: string[];
  clazz?: NoArgsClass;
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

  setName(name: string) {
    this.value.name = name;
  }

  addDependency(name: string) {
    this.value.dependencies.push(name);
  }

  setClass(clazz: NoArgsClass) {
    this.value.clazz = clazz;
  }
}
