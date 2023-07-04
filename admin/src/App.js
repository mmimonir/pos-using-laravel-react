/* eslint-disable jsx-a11y/anchor-is-valid */
import "./assets/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/css/style.scss";
import { RouterProvider } from "react-router-dom";
import ProjectRouter from "./components/router/ProjectRouter";
import { useEffect, useState } from "react";
import PublicRouter from "./components/router/PublicRouter";
import axios from "axios";

function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items?.token) {
      setAuth(true);
    }
  }, []);
  return (
    <>
      {auth ? (
        <RouterProvider router={ProjectRouter} />
      ) : (
        <RouterProvider router={PublicRouter} />
      )}
    </>
  );
}

export default App;
