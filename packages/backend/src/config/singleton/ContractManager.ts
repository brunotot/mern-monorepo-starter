import { type RouteMiddleware } from "@models";
import { type ContractName, type TODO } from "@org/shared";

export class ContractManager {
  private static instance: ContractManager;

  // TODO! implement middleware: [{req,res,next}]
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
