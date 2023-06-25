import $ from "jquery";
import React from "react";
import logo from "./../../assets/images/logo.png";

const Nav = () => {
  const handleSidebar = () => {
    $("body").toggleClass("sb-sidenav-toggled");
  };
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-theme">
      <a className="navbar-brand ps-3" href="index.html">
        <img src={logo} alt="logo" className="img-thumbnail" width={40} height={40}/>
      </a>

      <button
        onClick={handleSidebar}
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#!"
      >
        <i className="fas fa-bars"></i>
      </button>      
      <ul className="navbar-nav align-items-center ms-auto me-3 me-lg-4">
        <p className="text-white">Admin</p>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="#!">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                Activity Log
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
