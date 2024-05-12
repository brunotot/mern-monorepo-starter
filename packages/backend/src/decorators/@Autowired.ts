import { createFieldDecorator } from "@org/backend/decorators";
import { ServiceRegistry, InjectorMetadataManager } from "@org/backend/config";

export function Autowired<This, Value>() {
  return createFieldDecorator<This, Value>(({ meta }) => {
    const context = meta.context;
    const fieldName = String(context.name).toLowerCase();
    InjectorMetadataManager.getBy(context).addDependency(fieldName);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return function (_value: Value) {
      return ServiceRegistry.getInstance().inject<Value>(fieldName);
    };
  });
}
