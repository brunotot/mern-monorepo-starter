import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";

export type DatatableFilterProps = {
  label: string;
  isActive: () => boolean;
  render: () => React.ReactNode;
};

export function DatatableFilter({ label, render }: Omit<DatatableFilterProps, "isActive">) {
  return (
    <mui.Accordion disableGutters defaultExpanded>
      <mui.AccordionSummary expandIcon={<icons.ExpandMore />}>{label}</mui.AccordionSummary>
      <mui.AccordionDetails>{render()}</mui.AccordionDetails>
    </mui.Accordion>
  );
}
