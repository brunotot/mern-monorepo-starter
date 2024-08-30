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
  build: {
    outDir: pwd("dist"),
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
      "@org/frontend": pwd("src"),
      "@org/shared": pwd("../", "shared", "src"),
    },
  },
});
