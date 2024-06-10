import { TableCell } from "@mui/material";
import { memo } from "react";
import { DtActionList } from "../types/dt-action.types";
import DtActionRender from "./DtActionRender";

export type DtActionsCellProps<T> = {
  actions: DtActionList<T>;
  elem: T;
  dataIndex: number;
};

function DtActionsCell<T>({ actions, elem, dataIndex }: DtActionsCellProps<T>) {
  return (
    <TableCell className="!flex !px-2">
      {actions.map((action, index) => (
        <DtActionRender key={index} action={action()} index={dataIndex} row={elem} />
      ))}
    </TableCell>
  );
}

export default memo(DtActionsCell) as typeof DtActionsCell;
