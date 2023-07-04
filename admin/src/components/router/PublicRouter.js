import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Login from "../modules/auth/Login";
import Error500 from "../modules/Error500";

const PublicRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/error-500",
        element: <Error500 location={""} />,
      },
    ],
  },
]);

export default PublicRouter;
