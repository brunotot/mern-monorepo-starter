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
      all: true, // Include all files in the coverage report
      include: ["src/**/*.ts"], // Adjust based on your file structure
      exclude: ["src/**/index.ts"],
    },

    //globalSetup: "test/setup/globalSetup.ts",
    //setupFiles: ["test/setup/setupFiles.ts"],
  },
  resolve: {
    alias: {
      "@org/lib-commons/*": new URL("./dist/*", import.meta.url).pathname,
    },
  },
});
