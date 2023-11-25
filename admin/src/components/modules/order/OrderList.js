import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import Pagination from "react-js-pagination";
import Spinner from "../../utils/Spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../partials/miniComponent/Loader";
import NoDataFound from "../../partials/miniComponent/NoDataFound";
import GlobalFunction from "../../../GlobalFunction";

const OrderList = () => {
  const [input, setInput] = useState({
    order_by: "serial",
    per_page: 10,
    direction: "asc",
    search: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const [orders, setOrders] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getOrders = (pageNumber) => {
    setIsLoading(true);
    axiosInstance
      .get(
        `${Constants.BASE_URL}/order?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`
      )
      .then((res) => {
        console.log(res.data.data);
        setOrders(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setTotalItemsCount(res.data.meta.total);
        setStartFrom(res.data.meta.from);
        setActivePage(res.data.meta.current_page);
        setIsLoading(false);
      });
  };

  const handleDetailsModal = (order) => {
    setOrder(order);
    setModalShow(true);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <BreadCrumb title={"Order List"} location={"Dashboard"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-header">
              <CardHeader
                title={"Order List"}
                link={"/order/create"}
                icon={"fa-add"}
                button_text={"Add"}
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
                        <option value="name">Name</option>
                        <option value="created_at">Created at</option>
                        <option value="updated_at">Updated at</option>
                        <option value="serial">Serial</option>
                        <option value="status">Status</option>
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
                        onClick={() => getOrders(1)}
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
                  <table className="my-table table table-hover table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Order Details</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Sales</th>
                        <th>Date Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td className={"align-middle"}>
                            {startFrom + index}
                          </td>
                          <td>
                            <p>
                              Order No. <strong>{order.order_number}</strong>
                            </p>
                            <p className={"text-theme"}>
                              Order Status. {order.order_status_string}
                            </p>
                            <p>Payment Status. {order.payment_status}</p>
                          </td>
                          <td className={"align-middle"}>
                            <p className={"text-theme"}>
                              Name: {order.customer_name}
                            </p>
                            <p>Phone: {order.customer_phone}</p>
                          </td>
                          <td className={"align-middle"}>
                            <p>Quantity: {order.quantity}</p>
                            <p className={"text-theme"}>
                              Sub Total:{" "}
                              {GlobalFunction.formatPrice(order.sub_total)}
                            </p>
                            <p>
                              Discount:{" "}
                              {GlobalFunction.formatPrice(order.discount)}
                            </p>
                            <p className={"text-theme"}>
                              Total: {GlobalFunction.formatPrice(order.total)}
                            </p>
                            <p>
                              Due Amount:{" "}
                              {GlobalFunction.formatPrice(order.due_amount)}
                            </p>
                            <p className={"text-theme"}>
                              Paid Amount:{" "}
                              {GlobalFunction.formatPrice(order.paid_amount)}
                            </p>
                          </td>
                          <td className={"align-middle"}>
                            <p className={"text-theme"}>Shop : {order.shop}</p>
                            <p>Sales Mangr. : {order.sales_manager}</p>
                          </td>
                          <td className={"align-middle"}>
                            <p className={"text-theme"}>{order.created_at}</p>
                            <p>{order.updated_at}</p>
                          </td>
                          <td className={"align-middle"}>
                            <Link to={`/order/${order.id}`}>
                              <button className={"btn btn-info btn-sm"}>
                                <i className={"fa-solid fa-eye"} />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
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
                  onChange={getOrders}
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

export default OrderList;
