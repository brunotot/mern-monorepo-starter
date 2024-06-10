import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { DtColumnDef } from "../../../roberto/datatable/types/dt-column.types";

export type DatatablePropsV2<T> = {
  data: T[];
  columnDefs: readonly DtColumnDef<T>[];
};

export function Datatable<T>({ data, columnDefs }: DatatablePropsV2<T>) {
  return (
    <>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columnDefs.map(column => (
                  <TableCell key={String(column.id)}>
                    <Typography>{column.label}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  {columnDefs.map(column => (
                    <TableCell align={column.align}>
                      <Typography>
                        {/* @ts-expect-error Fix later */}
                        {column.render ? column.render(item[column.id], item) : item[column.id]}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
