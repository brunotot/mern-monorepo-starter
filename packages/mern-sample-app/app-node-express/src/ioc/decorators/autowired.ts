import { IocClassMetadata } from "@org/app-node-express/ioc/IocClassMetadata";
import { IocRegistry } from "@org/app-node-express/ioc/IocRegistry";

export function autowired(name?: string) {
  return function (_target: undefined, context: ClassFieldDecoratorContext) {
    let computedName = String(context.name).toLowerCase();
    if (name) computedName = name.toLowerCase();
    IocClassMetadata.getInstance(context).addDependency(computedName);

    return function () {
      return IocRegistry.getInstance().inject(computedName);
    };
  };
}
