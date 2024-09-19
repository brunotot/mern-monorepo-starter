import path from "path";

import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

import { TEST_PORT } from "./test/setup/globalSetup";

export default defineConfig({
  plugins: [tsconfigPaths()],
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
      // eslint-disable-next-line no-undef
      "@org/app-node-express/*": path.resolve(__dirname, "./dist/*"),
    },
  },
});
