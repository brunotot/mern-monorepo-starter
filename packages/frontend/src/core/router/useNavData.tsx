import {
  Apps,
  Home,
  Info,
  ListAlt,
  Login,
  ManageAccounts,
  Mood,
  PersonAdd,
  SpaceDashboard,
  TableView,
  TextIncrease,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { NavItemList } from "./navigation";

export function useNavData(): NavItemList {
  const { t } = useTranslation();

  return [
    {
      label: t("dashboard"),
      icon: <Home />,
    },
    {
      label: t("accountSettings"),
      icon: <ManageAccounts />,
    },
    {
      label: t("apps"),
      icon: <Apps />,
      children: [
        { label: t("calendar") },
        { label: t("invoice") },
        {
          label: t("user"),
          children: [{ label: t("list") }, { label: t("view") }],
        },
        { label: t("rolesAndPermissions") },
      ],
    },
    {
      label: t("pages"),
      dropdown: "persistent",
      children: [
        {
          label: t("login"),
          icon: <Login />,
        },
        {
          label: t("register"),
          icon: <PersonAdd />,
        },
        {
          label: t("error"),
          icon: <Info />,
        },
      ],
    },
    {
      label: t("userInterface"),
      dropdown: "persistent",
      children: [
        {
          label: t("typography"),
          icon: <TextIncrease />,
        },
        {
          label: t("icons"),
          icon: <Mood />,
        },
        {
          label: t("cards"),
          icon: <SpaceDashboard />,
        },
        {
          label: t("tables"),
          icon: <TableView />,
        },
        {
          label: t("forms"),
          icon: <ListAlt />,
        },
      ],
    },
  ];
}
