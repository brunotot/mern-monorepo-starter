import type { CombinedInputProps, ValueType } from "@/app/forms/input/Input/Input";
import type * as rhf from "react-hook-form";

import * as mui from "@mui/material";
import { Input } from "@/app/forms/input/Input/Input";

export type InputSelectProps<
  TInput,
  TForm extends rhf.FieldValues = rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
> = CombinedInputProps<TInput, TForm, TName> & {
  options: ValueType<TInput, TForm, TName>[];
  multiple?: boolean;
  startAdornment?: React.ReactNode;
} & (ValueType<TInput, TForm, TName> extends object
    ? Required<{
        getOptionLabel: (option: ValueType<TInput, TForm, TName>) => string;
        renderOption: (option: ValueType<TInput, TForm, TName>) => React.ReactNode;
      }>
    : {
        getOptionLabel?: (option: ValueType<TInput, TForm, TName>) => string;
        renderOption?: (option: ValueType<TInput, TForm, TName>) => React.ReactNode;
      });

export function InputSelect<
  TInput,
  TForm extends rhf.FieldValues = rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
>({
  label,
  error = "",
  required = false,
  disabled = false,
  options,
  placeholder = "",
  getOptionLabel,
  renderOption,
  multiple = false,
  startAdornment,
  ...inputProps
}: InputSelectProps<TInput, TForm, TName>) {
  const computedGetOptionLabel = getOptionLabel
    ? getOptionLabel
    : (option: ValueType<TInput, TForm, TName>) => String(option);
  const computedRenderOption = renderOption
    ? renderOption
    : (option: ValueType<TInput, TForm, TName>) => <>{String(option)}</>;

  return (
    <Input<TInput, TForm, TName>
      {...inputProps}
      render={({ value, onChange }) => {
        return (
          <mui.Autocomplete<ValueType<TInput, TForm, TName>, typeof multiple>
            multiple={multiple}
            disabled={disabled}
            options={options}
            getOptionLabel={o => {
              return computedGetOptionLabel(o);
            }}
            disableCloseOnSelect={multiple}
            value={value}
            onChange={(_event, value) => onChange(value)}
            filterSelectedOptions={multiple}
            renderOption={(props, option) => {
              const optionBody = computedRenderOption(option);
              const optionLabel = computedGetOptionLabel(option);
              return (
                <mui.MenuItem {...props} key={optionLabel}>
                  {optionBody}
                </mui.MenuItem>
              );
            }}
            renderInput={params => (
              <mui.TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: multiple ? params.InputProps.startAdornment : startAdornment,
                }}
                inputProps={{
                  ...params.inputProps,
                  required: value?.length === 0 && required,
                }}
                required={required}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error}
              />
            )}
          />
        );
      }}
    />
  );
}
