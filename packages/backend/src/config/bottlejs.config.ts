import Bottle from "bottlejs";
import { UserController } from "../controllers/UserController";
import { UserRepositoryImpl } from "../infrastructure/repository/impl/UserRepositoryImpl";
import { UserRoute } from "../routes/impl/UserRoute";
import {
  Class,
  DependencySchema,
  ServiceData,
  ServiceName,
} from "../typings/bottlejs.typings";

const bottle = new Bottle();
const container = bottle.container;

export const SERVICE_SCHEMA = {
  userRoute: UserRoute,
  userRepository: UserRepositoryImpl,
  userController: UserController,
} as const satisfies Record<string, Class>;

export const DEPENDENCY_SCHEMA: DependencySchema = {
  userRoute: ["userController"],
  userController: ["userRepository"],
};

export function inject<K extends keyof typeof SERVICE_SCHEMA>(
  name: K
): InstanceType<(typeof SERVICE_SCHEMA)[K]> {
  return container[name];
}

export function initializeDI() {
  function sortServiceDataList(data: ServiceData[]): ServiceData[] {
    return [...data].sort(([nameA, , ...depsA], [nameB, , ...depsB]) => {
      if (depsA.length === 0) return -1;
      if (depsB.length === 0) return 1;
      if (depsA.includes(nameB)) return 1;
      if (depsB.includes(nameA)) return -1;
      return 0;
    });
  }

  function buildServiceDataList(): ServiceData[] {
    return Object.entries(SERVICE_SCHEMA).map(([key, value]) => {
      const deps =
        DEPENDENCY_SCHEMA?.[key as keyof typeof DEPENDENCY_SCHEMA] ?? [];
      return [key as ServiceName, value, ...deps];
    });
  }

  const serviceDataList = buildServiceDataList();
  const sortedServiceDataList = sortServiceDataList(serviceDataList);

  sortedServiceDataList.forEach(([name, Class, ...deps]) => {
    bottle.service(name, Class, ...deps);
  });
}
