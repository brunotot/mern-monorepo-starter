import { type TODO } from "@org/lib-commons";
import { IocServiceDecoratorMetadataEntry } from "@org/app-node-express/lib/bottlejs";
import { iocRegistry } from "@org/app-node-express/lib/bottlejs";

export function autowired(_target: undefined, context: ClassFieldDecoratorContext<TODO, TODO>) {
  const componentName = String(context.name).toLowerCase();
  IocServiceDecoratorMetadataEntry.for(context).addDependency(componentName);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (_value: TODO) {
    return iocRegistry.inject<TODO>(componentName);
  };
}