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
    //globalSetup: "test/setup/globalSetup.ts",
    //setupFiles: ["test/setup/setupFiles.ts"],
  },
  resolve: {
    alias: {
      //"@org/app-node-express/*": new URL("./dist/*", import.meta.url).pathname,
    },
  },
});
