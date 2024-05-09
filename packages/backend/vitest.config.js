import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    //globalSetup: "./test-setup.ts", // Path to your setup file
    //globalTeardown: "./test-setup.ts", // Path to your teardown file
  },
});
