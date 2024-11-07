import type { InputProps } from "../InputText";

import * as mui from "@mui/material";
import { Controller, type FieldPath, type FieldValues } from "react-hook-form";

export type InputSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TItem = string,
> = InputProps<TFieldValues, TName> & {
  options: TItem[];
  multiple?: boolean;
} & (TItem extends object
    ? Required<{
        getOptionLabel: (option: TItem) => string;
      }>
    : {
        getOptionLabel?: (option: TItem) => string;
      });

export function InputSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TItem = string,
>({
  label,
  error = "",
  required = false,
  disabled = false,
  options,
  placeholder = "",
  getOptionLabel,
  multiple = false,
  ...controllerProps
}: InputSelectProps<TFieldValues, TName, TItem>) {
  const computedGetOptionLabel = getOptionLabel
    ? getOptionLabel
    : (option: TItem) => option as unknown as string;
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => (
        <mui.Autocomplete
          {...field}
          multiple={multiple}
          disabled={disabled}
          options={options}
          getOptionLabel={computedGetOptionLabel}
          disableCloseOnSelect={multiple}
          value={field.value}
          onChange={(_, value) => field.onChange(value)}
          filterSelectedOptions={multiple}
          renderOption={(props, option) => {
            const textual = computedGetOptionLabel(option);
            return (
              <mui.MenuItem {...props} key={textual}>
                {textual}
              </mui.MenuItem>
            );
          }}
          renderInput={params => (
            <mui.TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                required: field.value?.length === 0 && required,
              }}
              required={required}
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error}
            />
          )}
        />
      )}
    />
  );

  /*return (
    <Controller
      {...controllerProps}
      render={({ field }) => (
        <mui.TextField
          {...field}
          type={type}
          required={required}
          disabled={disabled}
          label={label}
          error={!!error}
          helperText={error}
        />
      )}
    />
  );*/
}
