import type { NoArgsClass } from "@org/lib-commons";

import { IocClassMetadata } from "@org/app-node-express/lib/bottlejs";

export function inject<T extends NoArgsClass>(name?: string) {
  return function (target: T, { name: className }: ClassDecoratorContext<T>) {
    let computedName = className?.toLowerCase();
    if (name) computedName = name.toLowerCase();
    if (!computedName)
      throw new Error("Parameter 'name' must be provided when using @inject() on anonymous class");
    IocClassMetadata.getInstance(target).setName(computedName);
    return target;
  };
}
