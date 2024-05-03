import { createFieldDecorator } from "@tsvdec/decorators";
import { Bottle, InjectableManager } from "@org/backend/config";

export function Autowired<This, Value>() {
  return createFieldDecorator<This, Value>(({ meta }) => {
    const context = meta.context;
    const fieldName = String(context.name);
    InjectableManager.from(context).addDependency(fieldName);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return function (_value: Value) {
      return Bottle.getInstance().inject<Value>(fieldName);
    };
  });
}
