import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Master from "../layout/Master";
import Dashboard from "../modules/Dashboard";
import Error500 from "../modules/Error500";
import AddCategory from "../modules/category/AddCategory";
import CategoryList from "../modules/category/CategoryList";
import Loader from "../partials/miniComponent/Loader";
import CategoryEdit from "../modules/category/CategoryEdit";

const ProjectRouter = createBrowserRouter([
  {
    path: "/",
    element: <Master />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/category",
        element: <CategoryList />,
      },
      {
        path: "/category/create",
        element: <AddCategory />,
      },
      {
        path: "/category/edit/:id",
        element: <CategoryEdit />,
      },
      {
        path: "/error-500",
        element: <Error500 location={"Dashboard"} />,
      },
    ],
  },
]);

export default ProjectRouter;
