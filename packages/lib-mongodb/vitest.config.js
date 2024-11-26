import { defineConfig } from "vitest/config";

import { vitestConfigFactory } from "../../vitest";

export default defineConfig(
  vitestConfigFactory({
    dependsOn: [
      {
        name: "lib-commons",
        path: "../lib-commons",
      },
    ],
  }),
);
