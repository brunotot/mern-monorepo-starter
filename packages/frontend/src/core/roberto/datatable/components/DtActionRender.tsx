import { Box } from "@mui/material";
import { MouseEvent } from "react";
import { DtAction } from "../types/dt-action.types";
import { TODO } from "@org/shared";

export type DtActionRenderProps<T> = {
  action: DtAction<T>;
  row: T;
  index: number;
};

export default function DtActionRender<T>({ action, row, index }: DtActionRenderProps<T>) {
  const handleClick = (e: MouseEvent<TODO>) => {
    e?.stopPropagation();
    action.clickHandler(row, index);
  };

  return (
    <Box className="flex justify-center items-center">
      {action.actionDependency}
      <Box onClick={handleClick}>{action.actionRender}</Box>
    </Box>
  );
}
