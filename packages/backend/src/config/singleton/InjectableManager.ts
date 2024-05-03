import { type ClassMetadataInjectType, ClassMetadataEntry } from "@tsvdec/decorators";
import { type TODO } from "@org/shared";
import { type MetaClassInjectionData } from "@org/backend/types";

export class InjectableManager extends ClassMetadataEntry<MetaClassInjectionData> {
  static from(injection: ClassMetadataInjectType) {
    return new InjectableManager(injection);
  }

  private constructor(injection: ClassMetadataInjectType) {
    super(injection, () => ({
      name: "",
      dependencies: [],
      constructorParams: [],
    }));
  }

  setConstructorParams(params: TODO[]) {
    this.value.constructorParams = params;
  }

  setName(name: string) {
    this.value.name = name;
  }

  addDependency(name: string) {
    this.value.dependencies.push(name);
  }
}
