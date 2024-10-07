import { TableChart, ViewSidebar } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { type LayoutVariant } from "@org/app-vite-react/app/layout";
import { useTranslation } from "@org/app-vite-react/lib/i18next";

export type InputLayoutToggleProps = {
  value: LayoutVariant;
  onChange: (value: LayoutVariant) => void;
};

export function InputLayoutToggle({ value, onChange }: InputLayoutToggleProps) {
  const t = useTranslation();
  const isHorizontalLayout = value === "HorizontalLayout";

  const onClick = () => {
    onChange(isHorizontalLayout ? "SidebarLayout" : "HorizontalLayout");
  };

  return (
    <Tooltip
      title={isHorizontalLayout ? t("systemLayoutHorizontal") : t("systemLayoutSidebar")}
      data-driver="layout"
    >
      <IconButton onClick={onClick}>
        {isHorizontalLayout ? <TableChart /> : <ViewSidebar />}
      </IconButton>
    </Tooltip>
  );
}
