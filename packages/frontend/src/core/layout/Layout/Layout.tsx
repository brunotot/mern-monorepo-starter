import { ReactNode } from "react";
import { LayoutComponent, LayoutVariant } from "./impl";

export type LayoutProps = { children: ReactNode };

export type LayoutPrefs = { variant: LayoutVariant };

export function Layout({ variant, ...props }: LayoutProps & LayoutPrefs) {
  const LayoutRenderer = LayoutComponent[variant];
  return <LayoutRenderer {...props} />;
}
