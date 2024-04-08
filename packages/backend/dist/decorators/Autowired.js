import { createFieldDecorator } from "@tsvdec/decorators";
import { inject } from "../config";
import { InjectionMetaService } from "../meta/InjectionMetaService";
/**
 * @remarks ONLY WORKS WITH CURRENT HOTFIX OF @tsvdec/core
 * The `createFieldDecorator` doesn't natively return the result of the supplier so the hotfix fixed that.
 */
export function Autowired() {
    return createFieldDecorator(({ meta }) => {
        const context = meta.context;
        const fieldName = String(context.name);
        InjectionMetaService.from(context).addDependency(fieldName);
        return function (_value) {
            return inject(fieldName);
        };
    });
}
//# sourceMappingURL=Autowired.js.map