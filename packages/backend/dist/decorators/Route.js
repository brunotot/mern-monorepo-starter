var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createMethodDecorator } from "@tsvdec/decorators";
import { inject } from "../config";
import { InjectionMetaService } from "../meta/InjectionMetaService";
import { RoutesMetaService, } from "../meta/RoutesMetaService";
export function Route(props) {
    return createMethodDecorator(({ target, meta }) => {
        const context = meta.context;
        function handler(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    InjectionMetaService.from(context).value.name;
                    const container = InjectionMetaService.from(context).value.name;
                    const _this = inject(container);
                    return yield target.call(_this, req, res);
                }
                catch (error) {
                    const message = error.message;
                    const [, ...stack] = error.stack
                        .split("\n")
                        .map((line) => line.trim());
                    const response = { message, stack };
                    res.status(500).send(response);
                }
            });
        }
        RoutesMetaService.from(context).addRoute(Object.assign(Object.assign({}, props), { name: String(context.name), middlewares: [], handler }));
        return handler;
    });
}
//# sourceMappingURL=Route.js.map