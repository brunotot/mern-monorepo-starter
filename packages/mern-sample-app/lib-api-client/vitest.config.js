import { defineConfig } from "vitest/config";

import { TEST_PORT } from "./test/setup/globalSetup";

export default defineConfig({
  server: {
    port: TEST_PORT,
  },
  build: {
    target: "ES6",
  },
  test: {
    globals: true,
    environment: "node",

    coverage: {
      all: true,
      include: ["src/**/*.ts"],
      exclude: ["src/**/index.ts"],
      reporter: ["text"],
    },

    //globalSetup: "test/setup/globalSetup.ts",
    //setupFiles: ["test/setup/setupFiles.ts"],
  },
  resolve: {
    alias: {
      //"@org/lib-commons/*": new URL("./../lib-commons/src/*", import.meta.url).pathname,
    },
  },
});
