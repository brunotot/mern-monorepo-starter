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

  addRouter(name: ContractName, handler: TODO) {
    const [controllerName, functionName] = name.split(".");
    this.#routers[controllerName] ??= {};
    this.#routers[controllerName][functionName] = handler;
  }

  getRouters() {
    return this.#routers;
  }
}
