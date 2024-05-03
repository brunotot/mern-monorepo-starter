import { type RouteMiddleware } from "@org/backend/types";
import { type ContractName, type TODO } from "@org/shared";

export class ContractManager {
  private static instance: ContractManager;

  #routers: TODO;

  public static getInstance(): ContractManager {
    ContractManager.instance ??= new ContractManager();
    return ContractManager.instance;
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
