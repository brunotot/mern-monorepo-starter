import { Bottle, InjectionDecoratorManager } from "@internal";
import { createFieldDecorator } from "@tsvdec/decorators";

/**
 * @remarks ONLY WORKS WITH CURRENT HOTFIX OF @tsvdec/core
 * The `createFieldDecorator` doesn't natively return the result of the supplier so the hotfix fixed that.
 */
export function Autowired<This, Value>() {
  return createFieldDecorator<This, Value>(({ meta }) => {
    const context = meta.context;
    const fieldName = String(context.name);
    InjectionDecoratorManager.from(context).addDependency(fieldName);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return function (_value: Value) {
      return Bottle.getInstance().inject<Value>(fieldName);
    };
  });
}
