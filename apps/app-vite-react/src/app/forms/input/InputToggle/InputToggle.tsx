import type { TODO } from "@org/lib-commons";
import type * as rhf from "react-hook-form";

import * as mui from "@mui/material";
import { Input, type ValueType, type CombinedInputProps } from "@/app/forms/input/Input/Input";

export type InputToggleProps<
  TInput,
  TForm extends rhf.FieldValues = rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
> = CombinedInputProps<TInput, TForm, TName> & {
  options: ValueType<TInput, TForm, TName>[];
} & (ValueType<TInput, TForm, TName> extends object
    ? Required<{
        renderOption: (option: ValueType<TInput, TForm, TName>) => React.ReactNode;
      }>
    : {
        renderOption?: (option: ValueType<TInput, TForm, TName>) => React.ReactNode;
      });

export function InputToggle<
  TInput,
  TForm extends rhf.FieldValues = rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
>({
  //label,
  //error = "",
  //required = false,
  //disabled = false,
  options,
  renderOption,
  ...inputProps
}: InputToggleProps<TInput, TForm, TName>) {
  const computedRenderOption = renderOption
    ? renderOption
    : (option: ValueType<TInput, TForm, TName>) => <>{String(option)}</>;

  return (
    <Input<TInput, TForm, TName>
      {...inputProps}
      render={({ value, onChange }) => (
        <mui.ToggleButtonGroup
          value={value}
          exclusive
          onChange={(_e, value) => onChange(value)}
          aria-label="Theme"
          sx={{
            width: "100%",
          }}
        >
          {options.map(option => (
            <mui.ToggleButton
              value={option as TODO}
              aria-label="Light Theme"
              sx={{
                flex: 1,
                borderColor: "rgba(var(--mui-palette-common-onBackgroundChannel) / 0.23)",
              }}
            >
              {computedRenderOption(option)}
            </mui.ToggleButton>
          ))}
        </mui.ToggleButtonGroup>
      )}
    />
  );
}
