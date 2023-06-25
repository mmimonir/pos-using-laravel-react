import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Login from "../modules/auth/Login";

const PublicRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
]);

export default PublicRouter;
