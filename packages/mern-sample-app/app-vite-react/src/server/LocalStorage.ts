import type { TODO, zod } from "@org/lib-commons";

import { z } from "@org/lib-commons";

import { LayoutVariant, LayoutWidth, SidebarPosition, Locale } from "../app/models";

type LocalStorageItem<S extends zod.ZodType<TODO, TODO, TODO> = TODO> = {
  schema: () => S;
  serialize: (value: zod.infer<S>) => string;
  deserialize: (value: string) => zod.infer<S>;
};

const LocalStorageData = {
  layoutVariant: {
    schema: () => LayoutVariant,
    serialize: value => value,
    deserialize: value => value as LayoutVariant,
  },
  layoutWidth: {
    schema: () => LayoutWidth,
    serialize: (value: LayoutWidth) => (typeof value === "string" ? value : value.toString()),
    deserialize: (value: string) => (value === "false" ? false : value),
  },
  sidebarPosition: {
    schema: () => SidebarPosition,
    serialize: (value: SidebarPosition) => value,
    deserialize: (value: string) => value as SidebarPosition,
  },
  locale: {
    schema: () => Locale,
    serialize: (value: Locale) => value,
    deserialize: (value: string) => value as Locale,
  },
  dark: {
    schema: () => z.boolean(),
    serialize: value => value.toString(),
    deserialize: value => value === "true",
  },
} as const satisfies Record<string, LocalStorageItem>;

type LocalStorageDataKey = keyof typeof LocalStorageData;

type LocalStorageDataValue<K extends LocalStorageDataKey> = zod.infer<
  ReturnType<(typeof LocalStorageData)[K]["schema"]>
>;

export class LocalStorage {
  public static get<K extends LocalStorageDataKey>(
    key: K,
    defaultValue: LocalStorageDataValue<K>,
  ): LocalStorageDataValue<K> {
    const value = localStorage.getItem(key);
    if (value === null) {
      this.set(key, defaultValue);
      return defaultValue;
    }
    const parsed: unknown = JSON.parse(value);
    const schema = LocalStorageData[key].schema();
    const result = schema.safeParse(parsed);
    if (!result.success) return defaultValue;
    return result.data;
  }

  public static set<K extends LocalStorageDataKey>(key: K, value: LocalStorageDataValue<K>): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private constructor() {
    // NOOP
  }
}
