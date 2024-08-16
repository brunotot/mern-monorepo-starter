import { ClassMetadataEntry } from "@org/backend/config/utils/ClassMetadataEntry";
import { type ClassMetadataInjectType } from "@org/backend/config/utils/ClassMetadata";

export type MetaClassInjectionData = {
  name: string;
  dependencies: string[];
};

export class InjectorMetadataManager extends ClassMetadataEntry<MetaClassInjectionData> {
  static getBy(injection: ClassMetadataInjectType) {
    return new InjectorMetadataManager(injection);
  }

  private constructor(injection: ClassMetadataInjectType) {
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
