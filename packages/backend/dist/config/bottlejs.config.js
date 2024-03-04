import Bottle from "bottlejs";
import { UserController } from "../controllers/UserController";
import { UserRepositoryImpl } from "../infrastructure/repository/impl/UserRepositoryImpl";
import { UserRoute } from "../routes/impl/UserRoute";
const bottle = new Bottle();
const container = bottle.container;
export const SERVICE_SCHEMA = {
    userRoute: UserRoute,
    userRepository: UserRepositoryImpl,
    userController: UserController,
};
export const DEPENDENCY_SCHEMA = {
    userRoute: ["userController"],
    userController: ["userRepository"],
};
export function inject(name) {
    return container[name];
}
export function initializeDI() {
    function sortServiceDataList(data) {
        return [...data].sort(([nameA, , ...depsA], [nameB, , ...depsB]) => {
            if (depsA.length === 0)
                return -1;
            if (depsB.length === 0)
                return 1;
            if (depsA.includes(nameB))
                return 1;
            if (depsB.includes(nameA))
                return -1;
            return 0;
        });
    }
    function buildServiceDataList() {
        return Object.entries(SERVICE_SCHEMA).map(([key, value]) => {
            var _a;
            const deps = (_a = DEPENDENCY_SCHEMA === null || DEPENDENCY_SCHEMA === void 0 ? void 0 : DEPENDENCY_SCHEMA[key]) !== null && _a !== void 0 ? _a : [];
            return [key, value, ...deps];
        });
    }
    const serviceDataList = buildServiceDataList();
    const sortedServiceDataList = sortServiceDataList(serviceDataList);
    sortedServiceDataList.forEach(([name, Class, ...deps]) => {
        bottle.service(name, Class, ...deps);
    });
}
//# sourceMappingURL=bottlejs.config.js.map