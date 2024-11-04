import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import * as rhf from "react-hook-form";

export type DatatableFilterProps<
  TForm extends rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
> = {
  label: string;
} & rhf.ControllerProps<TForm, TName>;

export function DatatableFilter<
  TForm extends rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
>({ label, ...controller }: DatatableFilterProps<TForm, TName>) {
  return (
    <mui.Accordion disableGutters>
      <mui.AccordionSummary expandIcon={<icons.ExpandMore />}>{label}</mui.AccordionSummary>
      <mui.AccordionDetails>
        <rhf.Controller {...controller} />
      </mui.AccordionDetails>
    </mui.Accordion>
  );
}
