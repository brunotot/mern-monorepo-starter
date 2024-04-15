import { TableChart, ViewSidebar } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { sigLayout } from "../../../signals";

export function InputLayoutToggle() {
  const { t } = useTranslation();
  const isHorizontalLayout = sigLayout.value === "HorizontalLayout";

  const handleToggle = () => {
    sigLayout.value =
      sigLayout.value === "HorizontalLayout"
        ? "SidebarLayout"
        : "HorizontalLayout";
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
