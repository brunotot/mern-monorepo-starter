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
import { startSession } from "mongoose";
import { inject } from "../config";
import { InjectionMetaService } from "../meta/InjectionMetaService";
function isClientSession(obj) {
    return (obj != null &&
        typeof obj === "object" &&
        typeof obj.startTransaction === "function" &&
        typeof obj.commitTransaction === "function" &&
        typeof obj.inTransaction === "function");
}
export function Transactional() {
    return createMethodDecorator(({ target: fn, meta }) => {
        const context = meta.context;
        const replacementMethod = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                const lastArg = args.at(-1);
                const isTransactionActive = isClientSession(lastArg);
                const session = isTransactionActive ? lastArg : yield startSession();
                !isTransactionActive && session.startTransaction();
                try {
                    const container = InjectionMetaService.from(context).value.name;
                    const _this = inject(container);
                    const result = isTransactionActive
                        ? yield fn.call(_this, ...args)
                        : yield fn.call(_this, ...args, session);
                    yield session.commitTransaction();
                    return result;
                }
                catch (error) {
                    !isTransactionActive && (yield session.abortTransaction());
                    throw error;
                }
                finally {
                    !isTransactionActive && session.endSession();
                }
            });
        };
        return replacementMethod;
    });
}
//# sourceMappingURL=Transactional.js.map