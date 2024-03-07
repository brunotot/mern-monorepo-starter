import { createFieldDecorator } from "@tsvdec/core";
import { Class } from "../utils/types";
import { getInjectionInstance, getInjectionItem } from "./Injectable";

export function getMetadata<C extends Class>(clazz: C): Record<string, any> {
  // @ts-expect-error
  Symbol.metadata ??= Symbol("Symbol.metadata");
  // @ts-expect-error
  return clazz[Symbol.metadata] ?? {};
}

/**
 * @remarks ONLY WORKS WITH CURRENT HOTFIX OF @tsvdec/core
 * The `createFieldDecorator` doesn't natively return the result of the supplier so the hotfix fixed that.
 */

export function Autowired<This, Value>() {
  return createFieldDecorator<This, Value>((meta, name, context, args) => {
    console.log(meta.value);
    // @ts-expect-error
    context.metadata ??= {};
    context.metadata.dependencies ??= [];
    // @ts-expect-error
    context.metadata.dependencies.push(String(context.name));

    return function (_args: Value) {
      return getInjectionInstance(getInjectionItem(String(context.name)).class);
    };
  });
}
