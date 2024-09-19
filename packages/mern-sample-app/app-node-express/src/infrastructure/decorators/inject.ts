import type { NoArgsClass } from "@org/lib-commons";

import { IocClassMetadata } from "@org/app-node-express/lib/bottlejs";

export function inject<T extends NoArgsClass>(name?: string) {
  return function (target: T, context: ClassDecoratorContext<T>) {
    const className = String(context.name);
    const computedName = name?.toLowerCase() ?? className.toLowerCase();
    const iocClassMetadata = IocClassMetadata.getInstance(context);
    iocClassMetadata.setName(computedName);
    iocClassMetadata.setClass(target);
  };
}
