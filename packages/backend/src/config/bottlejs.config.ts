import Bottle from "bottlejs";
import { getMetadata } from "../decorators/Autowired";
import { InjectionItem, getInjectionItems } from "../decorators/Injectable";

const bottle = new Bottle();
const container = bottle.container;

export function inject<T>(name: string): T {
  return container[name] as T;
}

export function initializeDI2() {
  const injectionItems = getInjectionItems();

  const dependencySchema: Record<string, string[]> = injectionItems.reduce(
    (acc, { name, class: Class }) => {
      const deps = getMetadata(Class).dependencies ?? [];
      return { ...acc, [name]: deps };
    },
    {}
  );

  function sortInjectionItems(
    items: InjectionItem[],
    dependencySchema: Record<string, string[]>
  ) {
    return [...items].sort(({ name: nameA }, { name: nameB }) => {
      if (dependencySchema[nameA].length === 0) return -1;
      if (dependencySchema[nameB].length === 0) return 1;
      if (dependencySchema[nameA].includes(nameB)) return 1;
      if (dependencySchema[nameB].includes(nameA)) return -1;
      return 0;
    });
  }

  const sortedInjectionItems = sortInjectionItems(
    injectionItems,
    dependencySchema
  );

  sortedInjectionItems.forEach(({ name, class: Class }) => {
    bottle.service(name, Class, ...dependencySchema[name]);
  });
}
