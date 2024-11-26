import type { TODO } from "@org/lib-commons";

import * as rhf from "react-hook-form";

// React specific

export type CombinedInputProps<
  TInput,
  TForm extends rhf.FieldValues = rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
> = InputVisualProps & TypedInputProps<TInput, TForm, TName>;

export type DeepItemType<T> = T extends Array<infer U> ? DeepItemType<U> : T;

export type ValueType<
  TInput,
  TForm extends rhf.FieldValues = rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
> = DeepItemType<TInput extends undefined ? rhf.FieldPathValue<TForm, TName> : TInput>;

//

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type InputRender<_TInput> = (props: {
  value: TODO;
  onChange: (value: TODO) => void;
}) => JSX.Element;

export type RhfControllerProps<
  TForm extends rhf.FieldValues = rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
> = Omit<rhf.ControllerProps<TForm, TName>, "render" | "control" | "name"> & {
  control: rhf.Control<TForm>;
  name: TName;
};

export type InputVisualProps = Partial<{
  label: string;
  error: string;
  required: boolean;
  disabled: boolean;
  placeholder: string;
}>;

export type UncontrolledInputProps<
  TForm extends rhf.FieldValues = rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
> = RhfControllerProps<TForm, TName> & {
  controlled?: false;
  control: rhf.Control<TForm>;
  name: TName;
};

export type ControlledInputProps<TInput> = {
  controlled: true;
  value: TInput;
  onChange: (value: TInput) => void;
};

export type TypedInputProps<
  TInput,
  TForm extends rhf.FieldValues = rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
> = ControlledInputProps<TInput> | UncontrolledInputProps<TForm, TName>;

function ControlledInput<TInput>({
  onChange,
  render,
  value,
}: Omit<ControlledInputProps<TInput>, "controlled"> & BaseInputProps<TInput>) {
  return render({ value, onChange });
}

function UncontrolledInput<
  TForm extends rhf.FieldValues = rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
>({
  render,
  ...controllerProps
}: UncontrolledInputProps<TForm, TName> & BaseInputProps<ValueType<undefined, TForm, TName>>) {
  return (
    <rhf.Controller<TForm, TName>
      {...controllerProps}
      render={({ field: { value, onChange } }) => render({ value: value as TODO, onChange })}
    />
  );
}

export type BaseInputProps<TInput> = {
  render: InputRender<TInput>;
};

export function Input<
  TInput,
  TForm extends rhf.FieldValues = rhf.FieldValues,
  TName extends rhf.FieldPath<TForm> = rhf.FieldPath<TForm>,
>(props: BaseInputProps<ValueType<TInput, TForm, TName>> & TypedInputProps<TInput, TForm, TName>) {
  if (props.controlled) return <ControlledInput {...(props as TODO)} />;
  return <UncontrolledInput {...(props as TODO)} />;
}
