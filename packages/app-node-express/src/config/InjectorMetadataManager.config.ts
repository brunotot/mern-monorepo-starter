import { ClassMetadataEntry } from "@org/app-node-express/config/ClassMetadataEntry.config";
import { type ClassMetadataInjectType } from "@org/app-node-express/config/ClassMetadata.config";

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
