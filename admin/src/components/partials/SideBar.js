import React from "react";
import GetLocalStorageItem from "../utils/GetLocalStorageItem";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion bg-theme-basic"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <Link className="nav-link" to={"/"}>
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Dashboard
            </Link>
            <div className="sb-sidenav-menu-heading">Management</div>
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Category
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="/category">
                  Category List
                </Link>
                <Link className="nav-link" to="/category/create">
                  Add Category
                </Link>
              </nav>
            </div>
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#sub-category"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Sub Category
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="sub-category"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="/sub-category">
                  Sub Category List
                </Link>
                <Link className="nav-link" to="/sub-category/create">
                  Add Sub Category
                </Link>
              </nav>
            </div>
            <a className="nav-link" href="tables.html">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              Tables
            </a>
          </div>
        </div>
        <div className="sb-sidenav-footer bg-theme text-silver">
          <div className="small">Logged in as:</div>
          {GetLocalStorageItem("name")}
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
