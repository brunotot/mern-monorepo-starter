import type { NoArgsClass } from "@org/lib-commons";

import fs from "fs";
import path from "path";

import { IocClassMetadata } from "@org/app-node-express/lib/bottlejs/IocClassMetadata";

/**
 * Scans the specified directories for classes containing **\@inject** decorator.
 *
 * @param outDir - The absolute path to the build directory of the package.
 * @param relativeDirs - An array of directory paths relative to the package root that should be scanned for components.
 * @returns A promise that resolves to a record containing component names and their corresponding classes.
 */
export async function scanIocModules(
  outDir: string,
  relativeDirs: string[],
): Promise<Record<string, NoArgsClass>> {
  const registeredComponents: Record<string, NoArgsClass> = {};

  for (const dir of relativeDirs) {
    const components = await loadComponentsFromDir(outDir, dir);
    components.forEach(component => {
      registeredComponents[component.name] = component.class;
    });
  }

  return registeredComponents;
}

type IocComponentMeta = {
  name: string;
  class: NoArgsClass;
};

async function loadComponentsFromDir(
  pathToProjectDir: string,
  relativePathFromProjectDir: string,
): Promise<IocComponentMeta[]> {
  const components: IocComponentMeta[] = [];
  const dir = relativePathFromProjectDir;
  const absolutePathToDir = path.join(pathToProjectDir, dir);

  async function processDirectory(directory: string) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.resolve(directory, file);
      const isFileDirectory = fs.lstatSync(filePath).isDirectory();
      const isFileJavaScript = file.match(/\.js$/);

      if (isFileDirectory) {
        await processDirectory(filePath);
      } else if (isFileJavaScript) {
        const module: Record<string, unknown> = await import(`file://${filePath}`);
        const keys = Object.keys(module);

        for (const key of keys) {
          const exportedClass = module[key];
          if (typeof exportedClass !== "function") continue;
          const exportedNoArgsClass = exportedClass as NoArgsClass;
          const meta = IocClassMetadata.getInstance(exportedNoArgsClass);
          const exportedNoArgsClassName = meta.getName();
          if (!exportedNoArgsClassName) continue;

          components.push({
            name: exportedNoArgsClassName,
            class: exportedNoArgsClass,
          });
        }
      }
    }
  }

  await processDirectory(absolutePathToDir);

  return components;
}
