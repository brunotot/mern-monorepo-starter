import type { Class } from "@org/shared";
import { default as BottleJs } from "bottlejs";
import type express from "express";
import { Router } from "express";

import { InjectionDecoratorManager } from "./InjectionDecoratorManager";
import { RouteDecoratorManager } from "./RouteDecoratorManager";

export class Bottle {
  private static instance: Bottle;

  readonly bottle: BottleJs;
  readonly container: BottleJs.IContainer<string>;
  readonly injectionClasses: Class[];

  public static getInstance(): Bottle {
    Bottle.instance ??= new Bottle();
    return Bottle.instance;
  }

  private constructor() {
    this.injectionClasses = [];
    this.bottle = new BottleJs();
    this.container = this.bottle.container;
  }

  public registerRoutes(app: express.Application) {
    this.injectionClasses.forEach(clazz => {
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

  public inject<T>(nameOrContext: string | DecoratorContext): T {
    if (typeof nameOrContext === "string") {
      return this.container[nameOrContext] as T;
    }
    const containerName = InjectionDecoratorManager.from(nameOrContext).value.name;
    return this.container[containerName] as T;
  }

  public iocStartup() {
    const injectionClasses = this.injectionClasses;

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
      this.bottle.service(name, Class, ...dependencySchema[name]);
    });
  }
}