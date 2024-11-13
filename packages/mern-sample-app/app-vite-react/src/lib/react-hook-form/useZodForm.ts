import type { TODO, zod } from "@org/lib-commons";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export type FormProps<T> = {
  defaultValue: T;
  onSubmit: (model: T) => void;
  groups?: string[];
};

export function useZodForm<Z extends zod.ZodType<TODO, TODO>>(props: {
  schema: Z;
  defaultValue: zod.infer<Z>;
}) {
  const defaultValue = props.defaultValue;
  const form = useForm<zod.infer<Z>>({
    resolver: zodResolver(props.schema),
    defaultValues: defaultValue,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return {
    form,
    control,
    handleSubmit,
    errors,
  } as const;
}
