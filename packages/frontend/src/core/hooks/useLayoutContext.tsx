import { useLocalStorage } from "@uidotdev/usehooks";
import { Dispatch, ReactNode, SetStateAction, createContext } from "react";
import { LayoutVariant } from "../layout/Layout/impl";
import { makeContextHook } from "./makeContextHook";

export type LayoutContextValue = {
  layout: LayoutVariant;
  setLayout: Dispatch<SetStateAction<LayoutVariant>>;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LayoutContext = createContext<LayoutContextValue | undefined>(
  undefined
);

export const useLayoutContext = makeContextHook(LayoutContext);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayout] = useLocalStorage<LayoutVariant>(
    "layout",
    "SidebarLayout"
  );

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}
