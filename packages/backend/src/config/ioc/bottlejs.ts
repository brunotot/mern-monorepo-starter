import { Class } from "@org/shared";
import Bottle from "bottlejs";
import { getInjectionClasses } from "../../decorators/ioc/@Injectable";
import { InjectionDecoratorManager } from "../../decorators/managers/InjectionDecoratorManager";

const bottle = new Bottle();
const container = bottle.container;

export function inject<T>(name: string): T {
  return container[name] as T;
}

export function iocStartup() {
  const injectionClasses = getInjectionClasses();

  const dependencySchema: Record<string, string[]> = injectionClasses.reduce((acc, Class) => {
    const { name, dependencies = [] } = InjectionDecoratorManager.from(Class).value;
    return { ...acc, [name]: dependencies };
  }, {});

  function sortInjectionClasses(classes: Class[], dependencySchema: Record<string, string[]>) {
    return [...classes].sort((classA, classB) => {
      const { name: nameA } = InjectionDecoratorManager.from(classA).value;
      const { name: nameB } = InjectionDecoratorManager.from(classB).value;
      if (dependencySchema[nameA].length === 0) return -1;
      if (dependencySchema[nameB].length === 0) return 1;
      if (dependencySchema[nameA].includes(nameB)) return 1;
      if (dependencySchema[nameB].includes(nameA)) return -1;
      return 0;
    });
  }

  const sortedInjectionClasses = sortInjectionClasses(injectionClasses, dependencySchema);

  sortedInjectionClasses.forEach(Class => {
    const name = InjectionDecoratorManager.from(Class).value.name;
    bottle.service(name, Class, ...dependencySchema[name]);
  });
}
