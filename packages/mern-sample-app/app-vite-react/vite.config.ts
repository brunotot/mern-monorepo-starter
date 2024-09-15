/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

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
      "@org/app-vite-react": pwd("src"),
      "@org/lib-commons": pwd("../", "lib-commons", "src"),
      "@org/lib-api-client": pwd("../", "lib-api-client", "src"),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [["module:@preact/signals-react-transform"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@org/app-vite-react": pwd("src"),
      "@org/lib-commons": pwd("../", "lib-commons", "src"),
      "@org/lib-api-client": pwd("../", "lib-api-client", "src"),
    },
  },
});
