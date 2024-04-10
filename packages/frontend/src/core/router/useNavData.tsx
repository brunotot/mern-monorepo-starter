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
      path: "/",
    },
    {
      label: t("accountSettings"),
      icon: <ManageAccounts />,
      path: "/account",
    },
    {
      label: t("apps"),
      icon: <Apps />,
      variant: "group",
      children: [
        { label: t("calendar"), path: "/calendar" },
        { label: t("invoice"), path: "/invoice" },
        {
          label: t("user"),
          variant: "menu",
          children: [
            { label: t("list"), path: "/user/list" },
            { label: t("view"), path: "/user/view" },
          ],
        },
        { label: t("rolesAndPermissions"), path: "/roles" },
      ],
    },
    {
      label: t("pages"),
      variant: "group",
      children: [
        {
          label: t("login"),
          icon: <Login />,
          path: "/login",
        },
        {
          label: t("register"),
          icon: <PersonAdd />,
          path: "/register",
        },
        {
          label: t("error"),
          icon: <Info />,
          path: "/error",
        },
      ],
    },
    {
      label: t("userInterface"),
      variant: "group",
      children: [
        {
          label: t("typography"),
          icon: <TextIncrease />,
          path: "/typography",
        },
        {
          label: t("icons"),
          icon: <Mood />,
          path: "/icons",
        },
        {
          label: t("cards"),
          icon: <SpaceDashboard />,
          path: "/cards",
        },
        {
          label: t("tables"),
          icon: <TableView />,
          path: "/tables",
        },
        {
          label: t("forms"),
          icon: <ListAlt />,
          path: "/forms",
        },
      ],
    },
  ];
}
