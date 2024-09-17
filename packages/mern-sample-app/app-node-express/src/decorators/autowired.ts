import { IocServiceDecoratorMetadataEntry } from "@org/app-node-express/lib/bottlejs";
import { iocRegistry } from "@org/app-node-express/lib/bottlejs";

export function autowired(name?: string) {
  return function (_target: undefined, context: ClassFieldDecoratorContext) {
    const fieldName = String(context.name);
    const computedName = name?.toLowerCase() ?? fieldName.toLowerCase();
    IocServiceDecoratorMetadataEntry.for(context).addDependency(computedName);

    return function () {
      return iocRegistry.inject(computedName);
    };
  };
}
