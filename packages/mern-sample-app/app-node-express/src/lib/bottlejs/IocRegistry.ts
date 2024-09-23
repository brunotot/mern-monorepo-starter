import { IocClassMetadata } from "@org/app-node-express/lib/bottlejs";
import { type TODO, type NoArgsClass } from "@org/lib-commons";
import { default as BottleJs } from "bottlejs";

export class IocRegistry {
  private static instance: IocRegistry;

  private readonly bottle: BottleJs;
  private readonly container: BottleJs.IContainer<string>;

  public static getInstance() {
    IocRegistry.instance ??= new IocRegistry();
    return IocRegistry.instance;
  }

  private constructor() {
    this.bottle = new BottleJs();
    this.container = this.bottle.container;
  }

  public inject<T = TODO>(nameOrContext: string | DecoratorContext): T {
    if (typeof nameOrContext === "string") return this.container[nameOrContext.toLowerCase()] as T;
    const containerName = IocClassMetadata.getInstance(nameOrContext).getName();
    return this.container[containerName.toLowerCase()] as T;
  }

  public iocStartup(registryData: Record<string, NoArgsClass>) {
    this.#setupComponentNameMetadata(registryData);
    const componentClasses = Object.values(registryData);
    const dependencySchema = this.#getDependencySchema(componentClasses);
    const sortedInjectionClasses = this.#getSortedInjectionClasses(
      componentClasses,
      dependencySchema,
    );
    sortedInjectionClasses.forEach(Class => {
      const name = IocClassMetadata.getInstance(Class).getName();
      this.bottle.service(name, Class, ...dependencySchema[name]);
    });
  }

  #getSortedInjectionClasses(classes: NoArgsClass[], dependencySchema: Record<string, string[]>) {
    return [...classes].sort((classA, classB) => {
      const nameA = IocClassMetadata.getInstance(classA).getName();
      const nameB = IocClassMetadata.getInstance(classB).getName();
      if (dependencySchema[nameA].length === 0) return -1;
      if (dependencySchema[nameB].length === 0) return 1;
      if (dependencySchema[nameA].includes(nameB)) return 1;
      if (dependencySchema[nameB].includes(nameA)) return -1;
      return 0;
    });
  }

  #getDependencySchema(classes: NoArgsClass[]): Record<string, string[]> {
    return classes.reduce((acc, Class) => {
      const iocClassMetadata = IocClassMetadata.getInstance(Class);
      const name = iocClassMetadata.getName();
      const dependencies = iocClassMetadata.getDependencies();
      return { ...acc, [name]: dependencies };
    }, {});
  }

  #setupComponentNameMetadata(config: Record<string, NoArgsClass>) {
    Object.entries(config).forEach(([key, constructor]) => {
      IocClassMetadata.getInstance(constructor).setName(key);
    });
  }
}
