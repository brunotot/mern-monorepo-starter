import { type default as express, Router } from "express";
import { default as BottleJs } from "bottlejs";
import { type Class } from "@org/shared";

// @backend
//import { InjectionDecoratorManager } from "./InjectionDecoratorManager";
//import { RouteDecoratorManager } from "./RouteDecoratorManager";
import { InjectionDecoratorManager } from "@config/singleton/InjectionDecoratorManager";
import { RouteDecoratorManager } from "@config/singleton/RouteDecoratorManager";

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
      const manager = InjectionDecoratorManager.from(Class);
      const decoration = manager.value;
      const name = decoration.name;
      const constructorParams = decoration.constructorParams;
      if (constructorParams.length > 0) {
        this.bottle.factory(name, container => {
          const instance = new Class(...constructorParams);
          const dependencies = dependencySchema[name];
          dependencies.forEach(dependencyName => {
            const dependencyInstance = container[dependencyName];
            instance[dependencyName] = dependencyInstance;
          });
          return instance;
        });
      } else {
        this.bottle.service(name, Class, ...dependencySchema[name]);
      }
    });
  }
}
