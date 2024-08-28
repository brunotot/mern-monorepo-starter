import { default as BottleJs } from "bottlejs";
import { InjectorMetadataManager } from "@org/backend/config/InjectorMetadataManager.config";
import { type TODO } from "@org/shared";

export class IocRegistry {
  private readonly bottle: BottleJs;
  readonly container: BottleJs.IContainer<string>;

  constructor() {
    this.bottle = new BottleJs();
    this.container = this.bottle.container;
  }

  public inject<T>(nameOrContext: string | DecoratorContext): T {
    if (typeof nameOrContext === "string") {
      return this.container[nameOrContext.toLowerCase()] as T;
    }
    const containerName = InjectorMetadataManager.getBy(nameOrContext).value.name;
    return this.container[containerName.toLowerCase()] as T;
  }

  #getSortedInjectionClasses(
    classes: (new () => TODO)[],
    dependencySchema: Record<string, string[]>,
  ) {
    return [...classes].sort((classA, classB) => {
      const { name: nameA } = InjectorMetadataManager.getBy(classA).value;
      const { name: nameB } = InjectorMetadataManager.getBy(classB).value;
      if (dependencySchema[nameA].length === 0) return -1;
      if (dependencySchema[nameB].length === 0) return 1;
      if (dependencySchema[nameA].includes(nameB)) return 1;
      if (dependencySchema[nameB].includes(nameA)) return -1;
      return 0;
    });
  }

  #getDependencySchema(classes: (new () => TODO)[]): Record<string, string[]> {
    return classes.reduce((acc, Class) => {
      const { name, dependencies = [] } = InjectorMetadataManager.getBy(Class).value;
      return { ...acc, [name]: dependencies };
    }, {});
  }

  #setupComponentNameMetadata(registryData: Record<string, new () => TODO>) {
    Object.entries(registryData).forEach(([className, constructor]) => {
      const componentName = className.toLowerCase();
      InjectorMetadataManager.getBy(constructor).setName(componentName);
    });
  }

  public iocStartup(registryData: Record<string, new () => TODO>) {
    this.#setupComponentNameMetadata(registryData);

    const componentClasses = Object.values(registryData);

    const dependencySchema = this.#getDependencySchema(componentClasses);

    const sortedInjectionClasses = this.#getSortedInjectionClasses(
      componentClasses,
      dependencySchema,
    );

    sortedInjectionClasses.forEach(Class => {
      const manager = InjectorMetadataManager.getBy(Class);
      const decoration = manager.value;
      const name = decoration.name;
      this.bottle.service(name, Class, ...dependencySchema[name]);
    });
  }
}
