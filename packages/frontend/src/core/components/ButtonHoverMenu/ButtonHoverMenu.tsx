import PopupState, { bindHover, bindPopover } from "material-ui-popup-state";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import { PopupState as PopupStateProps } from "material-ui-popup-state/hooks";
import { ReactNode, useId } from "react";

export type PositionType = "top" | "right" | "bottom" | "left";

export type ButtonHoverMenuProps = {
  temporary?: boolean;
  position?: PositionType;
  children: ReactNode;
  renderButton: (
    hoverProps: ReturnType<typeof bindHover>,
    popupState: PopupStateProps
  ) => ReactNode;
};

export type PositionData = {
  anchorOrigin: {
    vertical: "top" | "bottom" | "center";
    horizontal: "left" | "right" | "center";
  };
  transformOrigin: {
    vertical: "top" | "bottom" | "center";
    horizontal: "left" | "right" | "center";
  };
};

function getOriginPosition(position: PositionType): PositionData {
  if (position === "top") {
    return {
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
      transformOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    };
  }

  if (position === "right") {
    return {
      anchorOrigin: {
        vertical: "center",
        horizontal: "right",
      },
      transformOrigin: {
        vertical: "center",
        horizontal: "left",
      },
    };
  }

  if (position === "bottom") {
    return {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    };
  }

  return {
    anchorOrigin: {
      vertical: "center",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "center",
      horizontal: "right",
    },
  };
}

export function ButtonHoverMenu({
  temporary = false,
  position = "bottom",
  renderButton,
  children,
}: ButtonHoverMenuProps) {
  const generatedId = useId();
  const popupId = temporary ? undefined : generatedId;
  const { anchorOrigin, transformOrigin } = getOriginPosition(position);

  return (
    <PopupState variant="popover" popupId={popupId}>
      {(popupState) => (
        <>
          {renderButton(bindHover(popupState), popupState)}

          <HoverPopover
            {...bindPopover(popupState)}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
          >
            {children}
          </HoverPopover>
        </>
      )}
    </PopupState>
  );
}
