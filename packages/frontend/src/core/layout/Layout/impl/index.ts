import { LayoutRendererProps } from "../LayoutRenderer";
import { HorizontalLayout } from "./HorizontalLayout";
import { SidebarLayout } from "./SidebarLayout";

export * from "./HorizontalLayout";
export * from "./SidebarLayout";

export const LayoutComponent = {
  SidebarLayout,
  HorizontalLayout,
} as const satisfies Record<
  string,
  (props: LayoutRendererProps) => JSX.Element
>;

export type LayoutVariant = keyof typeof LayoutComponent;

export const LayoutVariantCollection = Object.keys(
  LayoutComponent
) as LayoutVariant[];
