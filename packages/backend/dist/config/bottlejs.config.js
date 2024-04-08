import Bottle from "bottlejs";
import { getInjectionClasses } from "../decorators/Injectable";
import { InjectionMetaService } from "../meta/InjectionMetaService";
const bottle = new Bottle();
const container = bottle.container;
export function inject(name) {
    return container[name];
}
export function initializeDI2() {
    const injectionClasses = getInjectionClasses();
    const dependencySchema = injectionClasses.reduce((acc, Class) => {
        const { name, dependencies = [] } = InjectionMetaService.from(Class).value;
        return Object.assign(Object.assign({}, acc), { [name]: dependencies });
    }, {});
    function sortInjectionClasses(classes, dependencySchema) {
        return [...classes].sort((classA, classB) => {
            const { name: nameA } = InjectionMetaService.from(classA).value;
            const { name: nameB } = InjectionMetaService.from(classB).value;
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
    const sortedInjectionClasses = sortInjectionClasses(injectionClasses, dependencySchema);
    sortedInjectionClasses.forEach((Class) => {
        const name = InjectionMetaService.from(Class).value.name;
        bottle.service(name, Class, ...dependencySchema[name]);
    });
}
//# sourceMappingURL=bottlejs.config.js.map