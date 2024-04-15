import "./core/config";
import "./main.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppProvider } from "./core";
import { RootErrorPage } from "./pages";
import { routes } from "./routes";

const router = createBrowserRouter([
  {
    element: <AppProvider />,
    errorElement: <RootErrorPage />,
    children: routes,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
