// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CssVarSerializerProps<T = any> = {
  serialize: (value: T) => string;
  deserialize: (value: string) => T;
  defaultValue: string;
};

export type CssVarName = keyof typeof CssPropSerializer;

export type CssVarType<Name extends CssVarName> = ReturnType<
  (typeof CssPropSerializer)[Name]["deserialize"]
>;

export const CssPropSerializer = {
  "--mui-shape-borderRadius": {
    serialize: (value: number) => `${value}px`,
    deserialize: (value: string) => parseInt(value.slice(0, -2), 10),
    defaultValue: "4px",
  },
} as const satisfies Record<string, CssVarSerializerProps>;
