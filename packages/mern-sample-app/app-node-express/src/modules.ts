import type { NoArgsClass } from "@org/lib-commons";

import * as fs from "fs";
import * as path from "path";
import { IocServiceDecoratorMetadataEntry } from "./lib/bottlejs";

type IocComponentMeta = {
  name: string;
  class: NoArgsClass;
};

export async function loadComponentsFromDir(dir: string): Promise<IocComponentMeta[]> {
  const components: IocComponentMeta[] = [];
  const absolutePathToDir = path.join(process.cwd(), "dist", dir);

  async function processDirectory(directory: string) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.resolve(directory, file);

      if (fs.lstatSync(filePath).isDirectory()) {
        await processDirectory(filePath);
      } else if (file.match(/\.(js)$/)) {
        const module: Record<string, unknown> = await import(filePath);
        const keys = Object.keys(module);

        for (const key of keys) {
          const exportedClass = module[key];
          if (typeof exportedClass !== "function") continue;
          const exportedNoArgsClass = exportedClass as NoArgsClass;
          const meta = IocServiceDecoratorMetadataEntry.for(exportedNoArgsClass);
          if (!meta.value.name) continue;

          components.push({
            name: meta.value.name,
            class: exportedNoArgsClass,
          });
        }
      }
    }
  }

  await processDirectory(absolutePathToDir);

  return components;
}

export async function scanIocModules(componentDirs: string[]) {
  const registeredComponents: Record<string, NoArgsClass> = {};
  for (const dir of componentDirs) {
    const components = await loadComponentsFromDir(dir);
    components.forEach(component => {
      registeredComponents[component.name] = component.class;
    });
  }
  return registeredComponents;
}
