import { TableChart, ViewSidebar } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "@org/app-vite-react/lib/i18next";
import { type LayoutVariant } from "@org/app-vite-react/app/layout";

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
    <Tooltip title={isHorizontalLayout ? t("systemLayoutHorizontal") : t("systemLayoutSidebar")}>
      <IconButton onClick={onClick}>
        {isHorizontalLayout ? <TableChart /> : <ViewSidebar />}
      </IconButton>
    </Tooltip>
  );
}
