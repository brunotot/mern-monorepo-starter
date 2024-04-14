import { useLocalStorage } from "@uidotdev/usehooks";
import { Dispatch, ReactNode, SetStateAction, createContext } from "react";
import { LayoutVariant } from "../components/Layout";
import { makeContextHook } from "./makeContextHook";

export type LayoutContextValue = {
  layout: LayoutVariant;
  setLayout: Dispatch<SetStateAction<LayoutVariant>>;
};

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
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
