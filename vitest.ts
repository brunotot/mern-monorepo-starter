import type { ViteUserConfig } from "vitest/config";

import tsconfigPaths from "vite-tsconfig-paths";

export type LocalPackageMetadata = {
  name: string;
  path: string;
};

export type VitestConfigFactoryProps = Partial<{
  port: number;
  dependsOn: LocalPackageMetadata[];
  target: string;
}>;

export function vitestConfigFactory(props?: VitestConfigFactoryProps): ViteUserConfig {
  const { port = 8888, target = "ES6", dependsOn = [] } = props ?? {};

  return {
    plugins: [tsconfigPaths()],
    server: {
      port,
    },
    build: {
      target,
    },
    test: {
      globals: true,
      environment: "node",
      globalSetup: "test/setup/globalSetup.ts",
      setupFiles: ["test/setup/setupFiles.ts"],
      include: ["test/**/*.test.ts", "test/**/*.test.tsx"],
      coverage: {
        all: true,
        include: ["src/**/*.ts"],
        exclude: ["src/**/index.ts", "src/**/types.ts"],
        reporter: ["text-summary", "text"],
      },
    },
    resolve: {
      alias: {
        "@/*": new URL("./src/*", import.meta.url).pathname,
        ...dependsOn.reduce(
          (acc, { name, path }) => ({
            ...acc,
            [`@org/${name}/*`]: new URL(`${path}/*`, import.meta.url).pathname,
          }),
          {},
        ),
      },
    },
  };
}
