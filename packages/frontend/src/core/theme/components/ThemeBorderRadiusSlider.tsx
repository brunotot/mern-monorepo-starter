import { useTranslation } from "react-i18next";
import { InputRange } from "../../components/input";
import { useCssVar } from "../hooks/useCssVar";

export default function ThemeBorderRadiusSlider() {
  const { t } = useTranslation();
  const [borderRadius, setBorderRadius] = useCssVar("--mui-shape-borderRadius");

  return (
    <InputRange
      label={t("borderRadius")}
      value={borderRadius}
      onChange={setBorderRadius}
      unit="px"
    />
  );
}
