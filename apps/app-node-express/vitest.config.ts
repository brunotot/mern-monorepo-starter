import { defineConfig } from "vitest/config";

import { vitestConfigFactory } from "../../vitest";

export default defineConfig(
  vitestConfigFactory({
    dependsOn: [
      {
        name: "lib-commons",
        path: "../../packages/lib-commons",
      },
      {
        name: "lib-api-client",
        path: "../../packages/lib-api-client",
      },
      {
        name: "lib-mongodb",
        path: "../../packages/lib-mongodb",
      },
      {
        name: "lib-decorators",
        path: "../../packages/lib-decorators",
      },
    ],
  }),
);
