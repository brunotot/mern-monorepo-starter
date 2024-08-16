import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const appToServe = "leather-proizvodnja";
//const appToServe = "old-testing-app";

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, `example-apps/${appToServe}`),
  //build: {
  //  outDir: path.resolve(__dirname, "dist/"),
  //},
  plugins: [
    react({
      babel: {
        plugins: [["module:@preact/signals-react-transform"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@org/shared": path.resolve(__dirname, "../shared/src"),
    },
  },
});
