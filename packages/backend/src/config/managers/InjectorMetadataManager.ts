import type { TODO } from "@org/shared";
import { type MetaClassInjectionData } from "@org/backend/types";
import { ClassMetadataEntry, type ClassMetadataInjectType } from "@org/backend/decorators";

export class InjectorMetadataManager extends ClassMetadataEntry<MetaClassInjectionData> {
  static getBy(injection: ClassMetadataInjectType) {
    return new InjectorMetadataManager(injection);
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
