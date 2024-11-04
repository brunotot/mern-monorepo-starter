import type * as rhf from "react-hook-form";

import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";

import { DatatableFilter, type DatatableFilterProps } from "../DatatableFilter/DatatableFilter";

export type DatatableFiltersProps<
  TForm extends rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
> = {
  filters: DatatableFilterProps<TForm, TName>[];
  onSearch: () => void;
};

export function DatatableFilters<
  TForm extends rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
>({ filters, onSearch }: DatatableFiltersProps<TForm, TName>) {
  return (
    <div>
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
        <mui.Button variant="contained" onClick={onSearch} color="primary">
          Search
        </mui.Button>
      </mui.Box>
    </div>
  );
}
