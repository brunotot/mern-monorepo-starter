import { ReactNode } from "react";
import { useLayoutContext } from "../../hooks/useLayoutContext";
import { LayoutComponent, LayoutVariant } from "./impl";

export type LayoutRendererProps = { children: ReactNode };

export type LayoutRendererPrefs = { variant?: LayoutVariant };

export function LayoutRenderer({
  variant,
  ...props
}: LayoutRendererProps & LayoutRendererPrefs) {
  const { layout } = useLayoutContext();
  const LayoutRendererComponent = LayoutComponent[variant ?? layout];
  return <LayoutRendererComponent {...props} />;
}
