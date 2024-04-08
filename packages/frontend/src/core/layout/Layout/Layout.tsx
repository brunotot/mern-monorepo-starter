import { ReactNode } from "react";
import { useLayoutContext } from "../useLayoutContext";
import { LayoutComponent, LayoutVariant } from "./impl";

export type LayoutProps = { children: ReactNode };

export type LayoutPrefs = { variant?: LayoutVariant };

export function Layout({ variant, ...props }: LayoutProps & LayoutPrefs) {
  const { layout } = useLayoutContext();
  const LayoutRenderer = LayoutComponent[variant ?? layout];
  return <LayoutRenderer {...props} />;
}
