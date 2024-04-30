import { type ClassMetadataInjectType, ClassMetadataEntry } from "@tsvdec/decorators";
import { type TODO } from "@org/shared";
import { type InjectionMetaItem } from "@models";

export class InjectableManager extends ClassMetadataEntry<InjectionMetaItem> {
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
