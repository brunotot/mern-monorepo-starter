import { CssPropSerializer, CssVarName } from "./CssPropSerializer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CssVarLocalStorageData = {
  [Name in CssVarName]: string;
};

export class CssVarLocalStorage {
  #data: CssVarLocalStorageData;

  constructor() {
    this.#data = this.#buildJSON();
  }

  get<const Name extends CssVarName>(name: Name): string {
    return this.#data[name];
  }

  set<const Name extends CssVarName>(name: Name, value: string): void {
    this.#data[name] = value;
    localStorage.setItem(
      "cssVars",
      JSON.stringify({ ...this.#data, [name]: value })
    );
    document.documentElement.style.setProperty(name, value);
  }

  #readFromStorage(): Partial<CssVarLocalStorageData> {
    return JSON.parse(localStorage.getItem("cssVars") ?? "{}");
  }

  #buildJSON(): CssVarLocalStorageData {
    const localValue = this.#readFromStorage();

    return Object.entries(CssPropSerializer).reduce(
      (acc, [name, { defaultValue }]) => {
        // @ts-expect-error False positive
        acc[name] = localValue[name] ?? defaultValue;
        return acc;
      },
      {} as CssVarLocalStorageData
    );
  }
}

export const cssVarLocalStorage = new CssVarLocalStorage();
