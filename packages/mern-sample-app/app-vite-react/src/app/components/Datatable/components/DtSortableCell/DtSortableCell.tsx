import { TableCell, Box, TableSortLabel } from "@mui/material";
import type { MouseEvent } from "react";
import { useCallback, useState } from "react";
import type {
  DtBaseColumnAlign,
  DtBaseColumnRenderHeader,
} from "@org/app-vite-react/app/components/Datatable";

export type DtSortableCellProps = {
  id: string;
  align?: DtBaseColumnAlign;
  renderHeader: DtBaseColumnRenderHeader;
  priority?: number;
  direction: "asc" | "desc";
  active: boolean;
  onClick: (id: string, event: MouseEvent) => void;
};

export function DtSortableCell({
  id,
  align = "left",
  renderHeader,
  priority,
  direction,
  active,
  onClick,
}: DtSortableCellProps) {
  const [hovered, setHovered] = useState(false);
  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);

  return (
    <>
      <TableCell onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Box
          display="flex"
          justifyContent={
            align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start"
          }
        >
          <Box display="flex" flexDirection={align === "right" ? "row-reverse" : "row"} gap={1}>
            {renderHeader()}
            <TableSortLabel
              onClick={e => onClick(id, e)}
              active={hovered || active}
              direction={direction}
            >
              {priority}
            </TableSortLabel>
          </Box>
        </Box>
      </TableCell>
    </>
  );
}
