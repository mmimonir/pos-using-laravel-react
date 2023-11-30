import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import CategoryPhotoModal from "../../partials/modals/CategoryPhotoModal";
import CategoryDetailsModal from "../../partials/modals/CategoryDetailsModal";
import Pagination from "react-js-pagination";
import Spinner from "../../utils/Spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../partials/miniComponent/Loader";
import NoDataFound from "../../partials/miniComponent/NoDataFound";
import GlobalFunction from "../../../GlobalFunction";

const ProductList = () => {
  const [input, setInput] = useState({
    order_by: "id",
    per_page: 10,
    direction: "desc",
    search: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [productColumns, setProductColumns] = useState([]);

  const getProductColumns = () => {
    axiosInstance
      .get(`${Constants.BASE_URL}/get-product-columns`)
      .then((res) => {
        setProductColumns(res.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getProducts = (pageNumber) => {
    setIsLoading(true);
    axiosInstance
      .get(
        `${Constants.BASE_URL}/product?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`
      )
      .then((res) => {
        console.log(res.data.data);
        setProducts(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setTotalItemsCount(res.data.meta.total);
        setStartFrom(res.data.meta.from);
        setActivePage(res.data.meta.current_page);
        setIsLoading(false);
      });
  };

  const handleProductDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      setIsLoading(true);
      if (result.isConfirmed) {
        axiosInstance
          .delete(`${Constants.BASE_URL}/product/${id}`)
          .then((res) => {
            setIsLoading(false);
            Swal.fire({
              position: "top-end",
              icon: res.data.cls,
              title: res.data.msg,
              showConfirmButton: false,
              toast: true,
              timer: 1500,
            });
            getProducts();
          })
          .catch((errors) => {
            console.log(errors);
            setIsLoading(false);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Cancelled",
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
      }
    });
  };
  useEffect(() => {
    getProducts();
    getProductColumns();
  }, []);
  return (
    <>
      <BreadCrumb title={"Product List"} location={"Dashboard"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-header">
              <CardHeader
                title={"Product List"}
                link={"/product/create"}
                icon={"fa-add"}
                button_text={"Add"}
                hide={true}
              />
            </div>
            <div className="card-body">
              <div className="search-area mb-4">
                <div className="row">
                  <div className="col-md-3">
                    <label className="w-100">
                      <p>Search</p>
                      <input
                        className="form-control form-control-sm"
                        type="search"
                        name="search"
                        placeholder="Search"
                        value={input.search}
                        onChange={handleInput}
                      />
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="w-100">
                      <p>Order By</p>
                      <select
                        className="form-select form-select-sm"
                        name="order_by"
                        value={input.order_by}
                        onChange={handleInput}
                      >
                        {productColumns.map((column, index) => (
                          <option key={index} value={column}>
                            {column}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label className="w-100">
                      <p>Order Direction</p>
                      <select
                        className="form-select form-select-sm"
                        name="direction"
                        value={input.direction}
                        onChange={handleInput}
                      >
                        <option value="asc">ASC</option>
                        <option value="desc">DESC</option>
                      </select>
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label className="w-100">
                      <p>Per Page</p>
                      <select
                        className="form-select form-select-sm"
                        name="per_page"
                        value={input.per_page}
                        onChange={handleInput}
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </label>
                  </div>
                  <div className="col-md-2">
                    <div className="d-grid mt-4">
                      <button
                        className={"btn btn-sm theme-button"}
                        onClick={() => getProducts(1)}
                      >
                        <i className={"fa-solid fa-magnifying-glass"}></i>
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {isLoading ? (
                <Loader />
              ) : (
                <div className="table-responsive soft-landing">
                  <table className="my-table table-sm product-table table table-hover table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Photo</th>
                        <th>Date Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(products).length > 0 ? (
                        products.map((product, index) => (
                          <tr key={index}>
                            <td>{startFrom + index}</td>
                            <td>
                              <p className={"text-theme"}>
                                Name: {product.name}
                              </p>
                              <p className={"text-success"}>
                                Slug: {product.slug}
                              </p>
                              <p className={"text-theme"}>
                                {product.attributes != undefined &&
                                Object.keys(product.attributes).length > 0
                                  ? product.attributes.map(
                                      (attribute, index) => (
                                        <p>
                                          <small key={index}>
                                            {attribute.name} : {attribute.value}
                                          </small>
                                        </p>
                                      )
                                    )
                                  : null}
                              </p>
                            </td>
                            <td>
                              <p className={"text-theme"}>
                                <strong>
                                  Sell Price: {product.sell_price.price}{" "}
                                  {product.sell_price.symbol}| Discount:{" "}
                                  {product.sell_price.discount}{" "}
                                  {product.sell_price.symbol}
                                </strong>
                              </p>
                              <p className={"text-success"}>
                                Discount : {product.discount_percent} +
                                {product.discount_fixed}
                              </p>
                              <p className={"text-theme"}>
                                Cost : {product.cost}
                              </p>
                              <p className={"text-success"}>
                                Discount Start : {product.discount_start}
                              </p>
                              <p className={"text-theme"}>
                                Discount End : {product.discount_end}
                              </p>
                            </td>
                            <td>
                              <p className={"text-theme"}>
                                Status: {product.status}
                              </p>
                              <p className={"text-success"}>
                                SKU : {product.sku}
                              </p>
                              <p className={"text-theme"}>
                                Stock : {product.stock}
                              </p>
                            </td>
                            <td>
                              <p className={"text-theme"}>
                                Category: {product.category}
                              </p>
                              <p className={"text-success"}>
                                Sub Category : {product.sub_category}
                              </p>
                              <p className={"text-theme"}>
                                Brand : {product.brand}
                              </p>
                              <p className={"text-success"}>
                                Origin : {product.country}
                              </p>
                              <p className={"text-theme"}>
                                Supplier : {product.supplier}
                              </p>
                            </td>
                            <td>
                              <img
                                src={product.primary_photo}
                                alt={product.name}
                                className={"img-thumbnail table-image"}
                              />
                            </td>

                            <td>
                              <p className={"text-theme"}>
                                <small>Created: {product.created_at}</small>
                              </p>
                              <p className={"text-success"}>
                                <small>Updated: {product.updated_at}</small>
                              </p>
                              <p className={"text-theme"}>
                                <small>Created By: {product.created_by}</small>
                              </p>
                              <p className={"text-success"}>
                                <small>Updated By: {product.updated_by}</small>
                              </p>
                            </td>
                            <td>
                              <div className="w-70">
                                <button className={"btn btn-sm btn-info"}>
                                  <i className={"fa-solid fa-eye"}></i>
                                </button>

                                {GlobalFunction.isAdmin() ? (
                                  <>
                                    <Link
                                      to={`/product/edit/${product.id}}`}
                                      className={"btn btn-sm btn-warning my-1"}
                                    >
                                      <i className={"fa-solid fa-edit"}></i>
                                    </Link>
                                    <button
                                      onClick={() =>
                                        handleProductDelete(product.id)
                                      }
                                      className={"btn btn-sm btn-danger"}
                                    >
                                      <i className={"fa-solid fa-trash"}></i>
                                    </button>
                                  </>
                                ) : null}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className={"text-center"}>
                            <NoDataFound text_color={"text-danger"} />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="card-footer">
              <nav className={"pagination-sm"}>
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={totalItemsCount}
                  pageRangeDisplayed={2}
                  onChange={getProducts}
                  itemClass="page-item"
                  linkClass="page-link"
                  nextPageText={"Next"}
                  prevPageText={"Prev"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
