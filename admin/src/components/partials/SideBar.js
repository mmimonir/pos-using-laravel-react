import React from "react";
import GetLocalStorageItem from "../utils/GetLocalStorageItem";
import { Link } from "react-router-dom";
import GlobalFunction from "../../GlobalFunction";
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
            <div className="sb-sidenav-menu-heading">Product</div>
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#productLayouts"
              aria-expanded="false"
              aria-controls="productLayouts"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Products
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="productLayouts"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="/product">
                  Product List
                </Link>
                {GlobalFunction.isAdmin() && (
                  <>
                    <Link className="nav-link" to="/product/create">
                      Add Product
                    </Link>
                    <Link className="nav-link" to="/product/create">
                      Trash
                    </Link>
                  </>
                )}
              </nav>
            </div>
            {GlobalFunction.isAdmin() && (
              <>
                <div className="sb-sidenav-menu-heading">Shops</div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#shops"
                  aria-expanded="false"
                  aria-controls="productLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns"></i>
                  </div>
                  Shop
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="shops"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to="/shop">
                      Shop List
                    </Link>
                    <Link className="nav-link" to="/shop/create">
                      Add Shop
                    </Link>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#sales-manager"
                  aria-expanded="false"
                  aria-controls="productLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns"></i>
                  </div>
                  Sales Manager
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="sales-manager"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to="/sales-manager">
                      Sales Manager List
                    </Link>
                    <Link className="nav-link" to="/sales-manager/create">
                      Add Sales Manager
                    </Link>
                  </nav>
                </div>
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
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#brand"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns"></i>
                  </div>
                  Brand
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="brand"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to="/brand">
                      Brand List
                    </Link>
                    <Link className="nav-link" to="/brand/create">
                      Add Brand
                    </Link>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#supplier"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns"></i>
                  </div>
                  Supplier
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="supplier"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to="/supplier">
                      Supplier List
                    </Link>
                    <Link className="nav-link" to="/supplier/create">
                      Add Supplier
                    </Link>
                  </nav>
                </div>
                <Link className="nav-link" to="/product-attributes">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-table"></i>
                  </div>
                  Product Attributes
                </Link>
              </>
            )}
            <div className="sb-sidenav-menu-heading">Orders</div>
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#orders"
              aria-expanded="false"
              aria-controls="productLayouts"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Order
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="orders"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="/order">
                  Order List
                </Link>
                <Link className="nav-link" to="/order/create">
                  Create Order
                </Link>
              </nav>
            </div>
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
