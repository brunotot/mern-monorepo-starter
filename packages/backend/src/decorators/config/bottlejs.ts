import Bottle from "bottlejs";
import type express from "express";
import { Router } from "express";

import { InjectionDecoratorManager, RouteDecoratorManager } from "@internal";
import type { Class } from "@org/shared";

const bottle = new Bottle();
const container = bottle.container;

const injectionClasses: Class[] = [];

export function getInjectionClasses() {
  return injectionClasses;
}

export function registerRoutes(app: express.Application) {
  getInjectionClasses().forEach(clazz => {
    const router = Router();
    const { basePath, routes } = RouteDecoratorManager.from(clazz).value;
    routes.forEach(({ method, path = "", middlewares, handler }) => {
      const fullPath = `${basePath}${path}`;
      const pipeline = middlewares ? [...middlewares, handler] : [handler];
      router[method](fullPath, ...pipeline);
    });
    app.use("/", router);
  });
}

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

iocStartup();
