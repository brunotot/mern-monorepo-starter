import { ReactNode } from "react";
import { useLayoutContext } from "../hooks";
import { HorizontalLayout, SidebarLayout } from "./impl";

export type LayoutRendererProps = { children: ReactNode };

export type LayoutRendererPrefs = { variant?: LayoutVariant };

export type LayoutVariant = keyof typeof LayoutComponent;

export const LayoutComponent = {
  SidebarLayout,
  HorizontalLayout,
} as const satisfies Record<
  string,
  (props: LayoutRendererProps) => JSX.Element
>;

export const LayoutVariantCollection = Object.keys(
  LayoutComponent
) as LayoutVariant[];

export function LayoutRenderer({
  variant,
  ...props
}: LayoutRendererProps & LayoutRendererPrefs) {
  const { layout } = useLayoutContext();
  const computedVariant: LayoutVariant = variant! ?? layout;
  const LayoutRendererComponent = LayoutComponent[computedVariant];
  return <LayoutRendererComponent {...props} />;
}
