import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";

import { DatatableFilter, type DatatableFilterProps } from "../DatatableFilter/DatatableFilter";

export type DatatableFiltersProps = {
  filters: DatatableFilterProps[];
  onSearch: () => void;
};

export function DatatableFilters({ filters, onSearch }: DatatableFiltersProps) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSearch();
      }}
    >
      <mui.Accordion disableGutters>
        <mui.AccordionSummary>
          <mui.Box display="flex" gap={1} alignItems="center">
            <icons.FilterAlt />
            <mui.Typography variant="h6">Filters</mui.Typography>
          </mui.Box>
        </mui.AccordionSummary>
      </mui.Accordion>
      {filters.map((filter, index) => (
        <DatatableFilter key={index} {...filter} />
      ))}
      <mui.Box
        sx={{
          paddingInline: 2,
          backgroundImage: "var(--mui-overlays-1)",
          paddingBottom: 2,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "var(--mui-palette-background-paper)",
        }}
      >
        <mui.Button variant="contained" type="submit" color="primary">
          Search
        </mui.Button>
      </mui.Box>
    </form>
  );
}
