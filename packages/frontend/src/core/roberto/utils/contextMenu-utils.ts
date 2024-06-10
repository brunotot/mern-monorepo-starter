/* eslint-disable @typescript-eslint/ban-types */
import { TODO } from "@org/shared";

type DataCtxAttributes = Record<string, string>;

function ctx<T>(key: string, value: T) {
  return {
    [`data-ctx-${key}`]: JSON.stringify(value),
  };
}

function ctxDataMapper<T extends Readonly<TODO>>(attrs: DataCtxAttributes, key: string): T {
  return JSON.parse(attrs[key]) as T;
}

function findAllDataCtxAttributes(target: HTMLElement): DataCtxAttributes {
  const result: Record<string, string> = {};

  function traverseDOM(element: HTMLElement | null) {
    if (!element) return;

    const dataAttributes = Array.from(element.attributes).filter(attr =>
      attr.name.startsWith("data-ctx-"),
    );

    if (dataAttributes.length > 0) {
      dataAttributes.forEach(attr => {
        const key = attr.name.replace("data-ctx-", "");
        result[key] = attr.value;
      });
    }

    traverseDOM(element.parentElement);
  }

  traverseDOM(target);
  return result;
}

type ReadonlyValues<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type Readonly<T> = T extends Record<string, TODO> ? Pick<T, ReadonlyValues<T>> : T;

class ContextMenuAttrs {
  #data: Record<string, TODO>;

  constructor(target: HTMLElement) {
    const attrs = findAllDataCtxAttributes(target);
    this.#data = Object.keys(attrs).reduce(
      (prev, key) => ({
        ...prev,
        [key]: ctxDataMapper(attrs, key),
      }),
      {},
    );
  }

  get<T>(key: string): Readonly<T> {
    return this.#data[key] as Readonly<T>;
  }
}

export { ContextMenuAttrs, ctx };
