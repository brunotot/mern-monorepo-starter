import Bottle from "bottlejs";
import { getInjectionClasses } from "../decorators/Injectable";
import { InjectionMetaService } from "../meta/InjectionMetaService";
import { Class } from "../utils/types";

const bottle = new Bottle();
const container = bottle.container;

export function inject<T>(name: string): T {
  return container[name] as T;
}

export function initializeDI2() {
  const injectionClasses = getInjectionClasses();

  const dependencySchema: Record<string, string[]> = injectionClasses.reduce(
    (acc, Class) => {
      const { name, dependencies = [] } =
        InjectionMetaService.from(Class).value;
      return { ...acc, [name]: dependencies };
    },
    {}
  );

  function sortInjectionClasses(
    classes: Class[],
    dependencySchema: Record<string, string[]>
  ) {
    return [...classes].sort((classA, classB) => {
      const { name: nameA } = InjectionMetaService.from(classA).value;
      const { name: nameB } = InjectionMetaService.from(classB).value;
      if (dependencySchema[nameA].length === 0) return -1;
      if (dependencySchema[nameB].length === 0) return 1;
      if (dependencySchema[nameA].includes(nameB)) return 1;
      if (dependencySchema[nameB].includes(nameA)) return -1;
      return 0;
    });
  }

  const sortedInjectionClasses = sortInjectionClasses(
    injectionClasses,
    dependencySchema
  );

  sortedInjectionClasses.forEach((Class) => {
    const name = InjectionMetaService.from(Class).value.name;
    bottle.service(name, Class, ...dependencySchema[name]);
  });
}
