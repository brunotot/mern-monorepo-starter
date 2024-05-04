import { type RouteMiddleware } from "@org/backend/types";
import { type ContractName, type TODO } from "@org/shared";

export class RouterCollection {
  private static instance: RouterCollection;

  #routers: TODO;

  public static getInstance(): RouterCollection {
    RouterCollection.instance ??= new RouterCollection();
    return RouterCollection.instance;
  }

  private constructor() {
    this.#routers = {};
  }

  addRouter(name: ContractName, handler: TODO, middleware: RouteMiddleware[]) {
    const [controllerName, functionName] = name.split(".");
    this.#routers[controllerName] ??= {};
    this.#routers[controllerName][functionName] = { handler, middleware };
  }

  getRouters() {
    return this.#routers;
  }
}
