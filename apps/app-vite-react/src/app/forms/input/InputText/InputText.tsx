import type * as rhf from "react-hook-form";

import * as mui from "@mui/material";
import { Input, type CombinedInputProps } from "@/app/forms/input/Input/Input";

export type InputTextProps<
  TInput,
  TForm extends rhf.FieldValues = rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
> = CombinedInputProps<TInput, TForm, TName> & {
  type?: React.InputHTMLAttributes<unknown>["type"];
};

export function InputText<
  TInput,
  TForm extends rhf.FieldValues = rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
>({
  label,
  error = "",
  required = false,
  disabled = false,
  type = "text",
  placeholder = "",
  ...inputProps
}: InputTextProps<TInput, TForm, TName>) {
  return (
    <Input<TInput, TForm, TName>
      {...inputProps}
      render={({ value, onChange }) => (
        <mui.TextField
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          required={required}
          disabled={disabled}
          label={label}
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
}
