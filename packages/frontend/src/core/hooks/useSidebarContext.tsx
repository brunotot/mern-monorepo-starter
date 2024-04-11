import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { makeContextHook } from "./makeContextHook";

export type SidebarContextValue = {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebarContext = makeContextHook(SidebarContext);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}
