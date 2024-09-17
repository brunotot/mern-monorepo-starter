import { IocServiceDecoratorMetadataEntry } from "@org/app-node-express/lib/bottlejs";
import { type NoArgsClass } from "@org/lib-commons";

export function inject<T extends NoArgsClass>(name?: string) {
  return function (target: T, context: ClassDecoratorContext<T>) {
    const className = String(context.name);
    const computedName = name?.toLowerCase() ?? className.toLowerCase();
    const iocServiceDecoratorMetadataEntry = IocServiceDecoratorMetadataEntry.for(context);
    iocServiceDecoratorMetadataEntry.setName(computedName);
    iocServiceDecoratorMetadataEntry.setClass(target);
  };
}
