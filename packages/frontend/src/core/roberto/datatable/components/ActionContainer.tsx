import { Box } from "@mui/material";
import { TODO } from "@org/shared";
import { MouseEvent, ReactNode } from "react";

export type ActionContainerProps<T> = {
  data: T;
  children: ReactNode | ReactNode[];
  actionDependency?: ReactNode;
  actionRender?: ReactNode;
  clickHandler: (item: T) => void;
};

export default function ActionContainer<T>({
  actionDependency,
  children,
  clickHandler,
  data,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  actionRender: _actionRender,
}: ActionContainerProps<T>) {
  const handleClick = (e: MouseEvent<TODO>) => {
    e?.stopPropagation();
    clickHandler(data);
  };
  return (
    <Box>
      <Box>{actionDependency}</Box>
      <Box onClick={handleClick}>{children}</Box>
    </Box>
  );
}
