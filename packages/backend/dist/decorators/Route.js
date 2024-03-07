var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { inject } from "../config";
const router = Router();
export function getRouter() {
    return router;
}
const addRoute = (requestRoute) => {
    const { method, path, middlewares, handler } = requestRoute;
    const fullPath = `${path}`;
    const pipeline = middlewares ? [...middlewares, handler] : [handler];
    router[method](fullPath, ...pipeline);
};
export function Route(props) {
    return function (target, context) {
        function handler(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const containerName = context.metadata.injectionName;
                try {
                    return yield target.call(inject(containerName), req, res);
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
        addRoute(Object.assign(Object.assign({}, props), { handler }));
        return handler;
    };
}
//# sourceMappingURL=Route.js.map