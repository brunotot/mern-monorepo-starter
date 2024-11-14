import type { ClientDatatableProps } from "@org/app-vite-react/app/components/Datatable";
import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import React, { useState } from "react";

export type ClientResponsiveTableProps<T> = ClientDatatableProps<T> & {
  renderRow: (item: T) => React.ReactNode;
};

export function ClientResponsiveTable<T>({
  columns,
  data,
  disablePagination,
  renderRow,
}: ClientResponsiveTableProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleItemClick = (item: T) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const cleanup = () => {
    setDialogOpen(false);
    //setSelectedItem(null); // Reset selected item when dialog closes
  };

  return (
    <>
      <mui.List
        sx={{ height: "100%", maxHeight: "calc(100vh - 320px)", overflow: "auto" }}
        component="div"
      >
        {data.map((item, index) => (
          <mui.ListItem
            component="div"
            key={index}
            onClick={() => handleItemClick(item)}
            sx={{
              cursor: "pointer",
              //backgroundColor: "red",
              borderRadius: 1,
              //marginBottom: 1,
              //padding: 2,
              "&:hover": {
                //backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            {renderRow(item)}
          </mui.ListItem>
        ))}
      </mui.List>

      <mui.Dialog open={dialogOpen} onClose={cleanup} fullWidth maxWidth="sm">
        <mui.DialogTitle>
          Item Details
          <mui.IconButton
            aria-label="close"
            onClick={cleanup}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500],
            }}
          >
            <icons.Close />
          </mui.IconButton>
        </mui.DialogTitle>

        <mui.DialogContent dividers>
          {selectedItem && (
            <mui.Box>
              {columns.map((column, idx) => (
                <mui.Box
                  key={idx}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 1.5,
                    paddingY: 1,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <mui.Typography component="div" variant="body2" color="text.secondary">
                    {column.renderHeader()}
                  </mui.Typography>
                  <mui.Typography
                    component="div"
                    variant="body2"
                    color="text.primary"
                    sx={{ fontWeight: 500 }}
                  >
                    {column.renderBody(selectedItem, { cleanup })}
                  </mui.Typography>
                </mui.Box>
              ))}
            </mui.Box>
          )}
        </mui.DialogContent>

        <mui.DialogActions>
          <mui.Button onClick={cleanup} color="primary" variant="contained">
            Close
          </mui.Button>
        </mui.DialogActions>
      </mui.Dialog>
    </>
  );
}
