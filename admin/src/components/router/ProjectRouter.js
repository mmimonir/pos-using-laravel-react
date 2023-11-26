import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Master from "../layout/Master";
import Dashboard from "../modules/Dashboard";
import Error500 from "../modules/Error500";
import AddCategory from "../modules/category/AddCategory";
import CategoryList from "../modules/category/CategoryList";
import CategoryEdit from "../modules/category/CategoryEdit";
import SubCategoryAdd from "../modules/subCategoryAdd/SubCategoryAdd";
import SubCategoryList from "../modules/subCategoryAdd/SubCategoryList";
import SubCategoryEdit from "../modules/subCategoryAdd/SubCategoryEdit";
import BrandAdd from "../modules/brand/BrandAdd";
import BrandList from "../modules/brand/BrandList";
import BrandEdit from "../modules/brand/BrandEdit";
import SupplierAdd from "../modules/suppliers/SupplierAdd";
import SupplierList from "../modules/suppliers/SupplierList";
import SupplierEdit from "../modules/suppliers/SupplierEdit";
import ProductAttributes from "../modules/productAttribute/ProductAttributes";
import AddProduct from "../modules/product/AddProduct";
import AddProductPhoto from "../modules/product/AddProductPhoto";
import ProductList from "../modules/product/ProductList";
import ShopAdd from "../modules/shop/ShopAdd";
import ShopList from "../modules/shop/ShopList";
import ShopEdit from "../modules/shop/ShopEdit";
import AddSalesManager from "../modules/salesManager/AddSalesManager";
import SalesManagerList from "../modules/salesManager/SalesManagerList";
import OrderCreate from "../modules/order/OrderCreate";
import OrderList from "../modules/order/OrderList";
import OrderDetails from "../modules/order/OrderDetails";
import BarCode from "../modules/barCode/BarCode";

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
        path: "/sub-category",
        element: <SubCategoryList />,
      },
      {
        path: "/sub-category/create",
        element: <SubCategoryAdd />,
      },
      {
        path: "/sub-category/edit/:id",
        element: <SubCategoryEdit />,
      },
      {
        path: "/brand",
        element: <BrandList />,
      },
      {
        path: "/brand/create",
        element: <BrandAdd />,
      },
      {
        path: "/brand/edit/:id",
        element: <BrandEdit />,
      },
      {
        path: "/supplier",
        element: <SupplierList />,
      },
      {
        path: "/supplier/create",
        element: <SupplierAdd />,
      },
      {
        path: "/supplier/edit/:id",
        element: <SupplierEdit />,
      },
      {
        path: "/product-attributes",
        element: <ProductAttributes />,
      },
      {
        path: "/product/create",
        element: <AddProduct />,
      },
      {
        path: "/product",
        element: <ProductList />,
      },
      {
        path: "/product/photo/:id",
        element: <AddProductPhoto />,
      },
      {
        path: "/shop/create",
        element: <ShopAdd />,
      },
      {
        path: "/shop",
        element: <ShopList />,
      },
      {
        path: "/shop/edit/:id",
        element: <ShopEdit />,
      },
      {
        path: "/sales-manager/create",
        element: <AddSalesManager />,
      },
      {
        path: "/sales-manager",
        element: <SalesManagerList />,
      },
      {
        path: "/order",
        element: <OrderList />,
      },
      {
        path: "/order/create",
        element: <OrderCreate />,
      },
      {
        path: "/order/:id",
        element: <OrderDetails />,
      },
      {
        path: "/generate-bar-code",
        element: <BarCode />,
      },
      {
        path: "/error-500",
        element: <Error500 location={"Dashboard"} />,
      },
    ],
  },
]);

export default ProjectRouter;
