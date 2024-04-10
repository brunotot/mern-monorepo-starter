import { TableChart, ViewSidebar } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLayoutContext } from "../../../../provider/LayoutProvider";

/*export function LayoutSelectBox() {
  const { t } = useTranslation();
  const { layout, setLayout } = useLayoutContext();

  return (
    <IconButtonSelect<LayoutVariant>
      value={layout}
      tooltip={t("systemLayout")}
      items={LayoutVariantCollection}
      renderEmpty={() => <ViewSidebar />}
      renderButton={(item) => <GridView />}
      mapToValue={(item) => item}
      mapToKey={(item) => item}
      onChange={(layout) => setLayout(layout)}
      renderOption={(item) => item}
    />
  );
}*/

export function LayoutSelectBox() {
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
