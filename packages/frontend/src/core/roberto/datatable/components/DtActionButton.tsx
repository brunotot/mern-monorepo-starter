import { IconButton, SvgIconTypeMap, Tooltip } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { memo } from "react";

type Color =
  | "inherit"
  | "action"
  | "disabled"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

export type DtActionButtonProps = {
  color: Color;
  translationKey: string;
  Icon: IconType;
};

type IconType = OverridableComponent<SvgIconTypeMap<object, "svg">> & {
  muiName: string;
};

function DtActionButton({ Icon, color, translationKey }: DtActionButtonProps) {
  return (
    <Tooltip title={translationKey}>
      <IconButton className="!py-0 !px-1">
        <Icon color={color} />
      </IconButton>
    </Tooltip>
  );
}

export default memo(DtActionButton) as typeof DtActionButton;
