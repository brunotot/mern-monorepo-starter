import PopupState, { bindHover, bindPopover } from "material-ui-popup-state";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import { PopupState as PopupStateProps } from "material-ui-popup-state/hooks";
import { ReactNode, useId } from "react";

export type OriginPositionX = "left" | "center" | "right";

export type OriginPositionY = "top" | "center" | "bottom";

export type OriginPosition = {
  anchorY: OriginPositionY;
  anchorX: OriginPositionX;
  transformY: OriginPositionY;
  transformX: OriginPositionX;
};

const DEFAULT_ORIGIN_POSITION: OriginPosition = {
  anchorY: "bottom",
  anchorX: "center",
  transformY: "top",
  transformX: "center",
};

export type ButtonHoverMenuProps = {
  temporary?: boolean;
  position?: OriginPosition;
  children: ReactNode;
  fixedAnchorWidth?: boolean;
  renderButton: (
    hoverProps: ReturnType<typeof bindHover>,
    popupState: PopupStateProps
  ) => ReactNode;
};

export function ButtonHoverMenu({
  temporary = false,
  position = DEFAULT_ORIGIN_POSITION,
  renderButton,
  children,
  fixedAnchorWidth = false,
}: ButtonHoverMenuProps) {
  const generatedId = useId();
  const popupId = temporary ? undefined : generatedId;
  const { anchorX, anchorY, transformX, transformY } = position;

  return (
    <PopupState variant="popover" popupId={popupId}>
      {(popupState) => (
        <>
          {renderButton(bindHover(popupState), popupState)}

          <HoverPopover
            {...bindPopover(popupState)}
            anchorOrigin={{ horizontal: anchorX, vertical: anchorY }}
            transformOrigin={{ horizontal: transformX, vertical: transformY }}
            PaperProps={{
              style: {
                width: !fixedAnchorWidth
                  ? undefined
                  : popupState.anchorEl
                  ? popupState.anchorEl.clientWidth
                  : undefined,
              },
            }}
          >
            {children}
          </HoverPopover>
        </>
      )}
    </PopupState>
  );
}
