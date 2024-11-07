import * as mui from "@mui/material";
import {
  Controller,
  type FieldPath,
  type FieldValues,
  type ControllerProps,
} from "react-hook-form";

export type InputControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "render">;

export type InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = InputControllerProps<TFieldValues, TName> & {
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

export type InputTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = InputProps<TFieldValues, TName> & {
  type?: React.InputHTMLAttributes<unknown>["type"];
};

export function InputText<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  error = "",
  required = false,
  disabled = false,
  type = "text",
  placeholder = "",
  ...controllerProps
}: InputTextProps<TFieldValues, TName>) {
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => (
        <mui.TextField
          {...field}
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
