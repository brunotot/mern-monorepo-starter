import { DecoratorMetadataEntry } from "@org/app-node-express/decorators/config/DecoratorMetadataEntry";
import { type DecoratorMetadataInjectType } from "@org/app-node-express/decorators/config/DecoratorMetadata";
import { type NoArgsClass } from "@org/lib-commons";

export class IocServiceDecoratorMetadataEntry extends DecoratorMetadataEntry<{
  name: string;
  dependencies: string[];
  clazz?: NoArgsClass;
}> {
  static for(injection: DecoratorMetadataInjectType) {
    return new IocServiceDecoratorMetadataEntry(injection);
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
