import type { DatatableFilterProps } from "../DatatableFilter/DatatableFilter";
import type { TODO, zod } from "@org/lib-commons";

import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import { FixedBadge } from "@org/app-vite-react/app/pages/admin-settings/manage-users/components";
import React from "react";

import { DatatableFilters } from "../DatatableFilters";

export type DatatableFilterButtonProps<TSchema extends zod.ZodType<TODO, TODO>> = {
  onSearch: () => void;
  filters: DatatableFilterProps<zod.infer<TSchema>>[];
};

export function DatatableFilterButton<TFilters extends zod.ZodType<TODO, TODO>>({
  onSearch: handleSearch,
  filters,
}: DatatableFilterButtonProps<TFilters>) {
  const badgeContent: number = 6;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <mui.Button
        variant="contained"
        color="primary"
        sx={{ paddingInline: 1 }}
        onClick={handleClick}
      >
        <icons.FilterAltOutlined />
        <mui.Box flex="1" marginRight={1}>
          Filters
        </mui.Box>
        <FixedBadge value={badgeContent > 0 ? badgeContent : undefined} />
      </mui.Button>
      <mui.Menu
        slotProps={{ paper: { sx: { width: "320px" } } }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <DatatableFilters onSearch={() => handleSearch()} filters={filters} />
      </mui.Menu>
    </>
  );
}
