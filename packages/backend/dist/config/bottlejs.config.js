import Bottle from "bottlejs";
import { getMetadata } from "../decorators/Autowired";
import { getInjectionItems } from "../decorators/Injectable";
const bottle = new Bottle();
const container = bottle.container;
export function inject(name) {
    return container[name];
}
export function initializeDI2() {
    const injectionItems = getInjectionItems();
    const dependencySchema = injectionItems.reduce((acc, { name, class: Class }) => {
        var _a;
        const deps = (_a = getMetadata(Class).dependencies) !== null && _a !== void 0 ? _a : [];
        return Object.assign(Object.assign({}, acc), { [name]: deps });
    }, {});
    function sortInjectionItems(items, dependencySchema) {
        return [...items].sort(({ name: nameA }, { name: nameB }) => {
            if (dependencySchema[nameA].length === 0)
                return -1;
            if (dependencySchema[nameB].length === 0)
                return 1;
            if (dependencySchema[nameA].includes(nameB))
                return 1;
            if (dependencySchema[nameB].includes(nameA))
                return -1;
            return 0;
        });
    }
    const sortedInjectionItems = sortInjectionItems(injectionItems, dependencySchema);
    sortedInjectionItems.forEach(({ name, class: Class }) => {
        bottle.service(name, Class, ...dependencySchema[name]);
    });
}
//# sourceMappingURL=bottlejs.config.js.map