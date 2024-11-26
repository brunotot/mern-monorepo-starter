/// <reference types="vitest" />

import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

function pwd(...args: string[]): string {
  return path.resolve(__dirname, ...args);
}

// https://vitejs.dev/config/
export default defineConfig({
  envDir: pwd(),
  root: pwd("src"),
  publicDir: pwd("public"),
  build: {
    outDir: pwd("dist"),
  },
  test: {
    include: [pwd("test/*.test.tsx"), pwd("test/*.test.ts")],
    globals: true,
    environment: "jsdom",
    setupFiles: pwd("test/setup/setupFiles.ts"),
    coverage: {
      all: true, // Include all files in the coverage report
      include: ["src/**/*.ts", "src/**/*.tsx"], // Adjust based on your file structure
      exclude: [],
      reporter: ["text"],
    },
    alias: {
      "@/*": pwd("src/*"),
      "@org/lib-commons": pwd("../../packages", "lib-commons", "src"),
      "@org/lib-api-client": pwd("../../packages", "lib-api-client", "src"),
    },
  },
  plugins: [
    tsconfigPaths(),
    react({
      babel: {
        plugins: [["module:@preact/signals-react-transform"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@/*": path.resolve(__dirname, "./src/*"),
      "@org/lib-commons": pwd("../../packages", "lib-commons", "src"),
      "@org/lib-api-client": pwd("../../packages", "lib-api-client", "src"),
    },
  },
});
