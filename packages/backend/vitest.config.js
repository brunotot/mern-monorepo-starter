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
    globalSetup: "test/setup/globalSetup.ts",
    setupFiles: ["test/setup/setupFiles.ts"],
  },
  resolve: {
    alias: {
      "@org/backend/config": new URL("./dist/config", import.meta.url).pathname,
      "@org/backend/config/*": new URL("./dist/config/*", import.meta.url).pathname,
      "@org/backend/decorators": new URL("./dist/decorators", import.meta.url).pathname,
      "@org/backend/decorators/*": new URL("./dist/decorators/*", import.meta.url).pathname,
      "@org/backend/types": new URL("./dist/types", import.meta.url).pathname,
      "@org/backend/types/*": new URL("./dist/types/*", import.meta.url).pathname,
      "@org/backend/infrastructure": new URL("./dist/infrastructure", import.meta.url).pathname,
      "@org/backend/infrastructure/*": new URL("./dist/infrastructure/*", import.meta.url).pathname,
    },
  },
});
