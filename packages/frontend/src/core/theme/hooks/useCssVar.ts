import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CssPropSerializer, CssVarName, CssVarType } from "../utils/css-var";
import { cssVarLocalStorage } from "../utils/css-var/CssVarLocalStorage";

export type CssVarStateResult<T> = readonly [T, Dispatch<SetStateAction<T>>];

export function useCssVar<const Name extends CssVarName>(
  name: Name
): CssVarStateResult<CssVarType<Name>> {
  const { serialize, deserialize } = CssPropSerializer[name];
  const prevName = useRef(name);
  // @ts-expect-error False positive
  const [value, setValue] = useState<CssVarType<Name>>(() =>
    deserialize(cssVarLocalStorage.get(name))
  );

  useEffect(() => {
    if (prevName.current !== name) {
      prevName.current = name;
      // @ts-expect-error False positive
      setValue(deserialize(cssVarLocalStorage.get(name)));
    }
    cssVarLocalStorage.set(name, serialize(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, value]);

  return [value, setValue] as const;
}
