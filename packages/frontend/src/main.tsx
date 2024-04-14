import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { $FrontendAppConfig, convertToRoutes } from "./core/config/index";
import { RootErrorPage, RootLayoutPage } from "./core/pages/index";
import "./main.css";

const router = createBrowserRouter([
  {
    element: <RootLayoutPage />,
    errorElement: <RootErrorPage />,
    children: convertToRoutes($FrontendAppConfig.navigationRoutes),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
