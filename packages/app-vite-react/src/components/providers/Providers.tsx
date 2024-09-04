import React from "react";

export type Provider = React.FC<{ children: React.ReactNode }>;

// Function to nest children within a component
const nest = (children: React.ReactNode, Provider: React.FC<{ children: React.ReactNode }>) => (
  <Provider>{children}</Provider>
);

/** @hidden */
export type ProvidersProps = React.PropsWithChildren<{
  list: Array<React.FC<{ children: React.ReactNode }>>;
}>;

// Providers component definition
export const Providers: React.FC<ProvidersProps> = ({ children, list }) => {
  return <>{list.reduceRight(nest, children)}</>;
};
