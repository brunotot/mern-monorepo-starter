import type { DatatableFilterProps } from "../DatatableFilter/DatatableFilter";

import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import { FixedBadge } from "@/app/pages/admin-settings/manage-users/components";
import React from "react";

import { DatatableFilters } from "../DatatableFilters";

export type DatatableFilterButtonProps = {
  onClear: () => void;
  onSearch: () => void;
  filters: DatatableFilterProps[];
};

export function DatatableFilterButton({
  onSearch: handleSearch,
  onClear: handleClear,
  filters,
}: DatatableFilterButtonProps) {
  const badgeContent: number = filters.reduce(
    (acc, filter) => (filter.isActive() ? acc + 1 : acc),
    0,
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSearch = () => {
    handleSearch();
    handleClose();
  };

  const onClear = () => {
    handleClear();
    handleSearch();
  };

  return (
    <>
      <mui.Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
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

        {badgeContent > 0 && (
          <mui.IconButton size="small" onClick={onClear}>
            <icons.Close fontSize="small" />
          </mui.IconButton>
        )}
      </mui.Box>
      <mui.Menu
        slotProps={{ paper: { sx: { width: "320px" } } }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <DatatableFilters onSearch={onSearch} filters={filters} />
      </mui.Menu>
    </>
  );
}
