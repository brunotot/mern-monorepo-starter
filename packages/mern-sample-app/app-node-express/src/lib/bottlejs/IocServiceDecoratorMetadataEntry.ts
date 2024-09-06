import { DecoratorMetadataEntry } from "@org/app-node-express/decorators/config/DecoratorMetadataEntry";
import { type DecoratorMetadataInjectType } from "@org/app-node-express/decorators/config/DecoratorMetadata";

export class IocServiceDecoratorMetadataEntry extends DecoratorMetadataEntry<{
  name: string;
  dependencies: string[];
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
}
