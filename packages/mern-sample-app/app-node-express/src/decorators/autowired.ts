import { IocServiceDecoratorMetadataEntry } from "@org/app-node-express/lib/bottlejs";
import { iocRegistry } from "@org/app-node-express/lib/bottlejs";

export function autowired(_target: undefined, context: ClassFieldDecoratorContext) {
  const componentName = String(context.name).toLowerCase();
  IocServiceDecoratorMetadataEntry.for(context).addDependency(componentName);

  return function () {
    return iocRegistry.inject(componentName);
  };
}
