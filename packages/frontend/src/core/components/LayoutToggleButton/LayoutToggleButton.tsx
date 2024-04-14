import { TableChart, ViewSidebar } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLayoutContext } from "../../hooks/useLayoutContext";

export function LayoutToggleButton() {
  const { t } = useTranslation();
  const { layout, setLayout } = useLayoutContext();
  const isHorizontalLayout = layout === "HorizontalLayout";

  const handleToggle = () => {
    setLayout(
      layout === "HorizontalLayout" ? "SidebarLayout" : "HorizontalLayout"
    );
  };

  return (
    <Tooltip
      title={
        isHorizontalLayout
          ? t("systemLayoutHorizontal")
          : t("systemLayoutSidebar")
      }
    >
      <IconButton onClick={handleToggle}>
        {isHorizontalLayout ? <TableChart /> : <ViewSidebar />}
      </IconButton>
    </Tooltip>
  );
}
