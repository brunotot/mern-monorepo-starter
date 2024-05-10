import "./../../dist/index";

import { type App } from "../../src/App";
import app from "../../dist/worker";
import { ServiceRegistry } from "../../dist/config/singletons/ServiceRegistry";

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare module globalThis {
  let MockApp: App | undefined;
}

beforeAll(async () => {
  ServiceRegistry.getInstance().iocStartup();
  //const uri = inject("mongoUri");
  const MockApp = app; /*new App({
    mongoConnection: async () => ({
      uri,
      options: {},
    }),
  });*/

  await MockApp.listen();
  // @ts-expect-error Error
  globalThis.MockApp = MockApp;
});

afterAll(async () => {
  delete globalThis.MockApp;
});
