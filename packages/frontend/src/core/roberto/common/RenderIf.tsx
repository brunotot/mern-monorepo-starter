import React, { memo } from "react";

export type RenderIfProps = {
  test: boolean;
  children: React.ReactNode;
};

function RenderIf({ test, children }: RenderIfProps) {
  if (test) {
    return <>{children}</>;
  }
  return <></>;
}

export default memo(RenderIf);
