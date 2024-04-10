import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import { LoginPage } from "../pages/Login/LoginPage";
import { RootErrorPage } from "../pages/Root/RootErrorPage";
import { RootLayoutPage } from "../pages/Root/RootLayoutPage";
import { Status404Page } from "../pages/Status404";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <RootLayoutPage />,
    errorElement: <RootErrorPage />,
    children: [
      {
        path: "/",
        //element: <HomePage />,
        Component: HomePage,
      },
      {
        path: "secured",
        element: (
          <ProtectedRoute>
            <div>Secured page</div>
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <Status404Page />,
      },
    ],
  },
]);

export default router;
