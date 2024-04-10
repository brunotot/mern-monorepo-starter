import { Outlet, createBrowserRouter, useRouteError } from "react-router-dom";
import { BaseLayout } from "../../App";
import { LoginPage } from "../pages/LoginPage";
import { SecuredPage } from "../pages/SecuredPage";
import ProtectedRoute from "./ProtectedRoute";

export function RootErrorBoundary() {
  const error = useRouteError() as Error;
  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = "/")}>
        Click here to reload the app
      </button>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Outlet />,
        errorElement: <RootErrorBoundary />,
        children: [
          {
            path: "secured",
            element: (
              <ProtectedRoute>
                <SecuredPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
