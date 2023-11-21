import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import AddCustomer from "../../partials/modals/AddCustomer";
import ShowOrderConfirmation from "../../partials/modals/ShowOrderConfirmation";

const OrderCreate = () => {
  const [input, setInput] = useState({
    order_by: "id",
    per_page: 10,
    direction: "desc",
    search: "",
  });

  const [customerInput, setCustomerInput] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const [carts, setCarts] = useState({});
  const [orderSummary, setOrderSummary] = useState({
    items: 0,
    amount: 0,
    discount: 0,
    payable: 0,
    customer: "",
    customer_id: 0,
  });
  const [order, setOrder] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [modalOrderConfirmationShow, setModalOrderConfirmationShow] =
    useState(false);

  const selectCustomer = (customer) => {
    setOrder((prevState) => ({ ...prevState, customer_id: customer.id }));
    setOrderSummary((prevState) => ({
      ...prevState,
      customer: customer.name + " " + customer.phone,
    }));
    setOrderSummary((prevState) => ({
      ...prevState,
      customer_id: customer.id,
    }));
  };

  const handleCustomerSearch = (e) => {
    setCustomerInput(e.target.value);
  };

  const handleIncrease = (id) => {
    if (carts[id].quantity >= carts[id].stock) return;
    setCarts((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], quantity: carts[id].quantity + 1 },
    }));
  };
  const handleDecrease = (id) => {
    if (carts[id].quantity <= 1) return;
    setCarts((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], quantity: carts[id].quantity - 1 },
    }));
  };

  const getCustomer = () => {
    setIsLoading(true);
    axiosInstance
      .get(`${Constants.BASE_URL}/customer?search=${customerInput}`)
      .then((res) => {
        setCustomers(res.data);
        setIsLoading(false);
      });
  };

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const removeCartItem = (key) => {
    delete carts[key];
    setCarts((prevState) => ({
      ...prevState,
    }));
  };

  const handleCart = (id) => {
    products.map((product, index) => {
      if (product.id === id) {
        if (carts[id] == undefined) {
          setCarts((prevState) => ({
            ...prevState,
            [id]: product,
          }));
          setCarts((prevState) => ({
            ...prevState,
            [id]: { ...prevState[id], quantity: 1 },
          }));
        } else {
          if (carts[id].stock > carts[id].quantity) {
            setCarts((prevState) => ({
              ...prevState,
              [id]: { ...prevState[id], quantity: carts[id].quantity + 1 },
            }));
          }
        }
      }
    });
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

  const calculateOrderSummary = () => {
    let items = 0;
    let amount = 0;
    let discount = 0;
    let payable = 0;

    Object.keys(carts).map((key) => {
      amount += carts[key].original_price * carts[key].quantity;
      discount += carts[key].sell_price.discount * carts[key].quantity;
      payable += carts[key].sell_price.price * carts[key].quantity;
      items += carts[key].quantity;
    });

    setOrderSummary((prevState) => ({
      ...prevState,
      items: items,
      amount: amount,
      discount: discount,
      payable: payable,
    }));
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    calculateOrderSummary();
  }, [carts]);

  return (
    <>
      <BreadCrumb title={"Create Order"} location={"Dashboard"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Create Order"}
                link={"/order"}
                icon={"fa-list"}
                button_text={"List"}
              />
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h5>Product List</h5>
                    </div>
                    <div className="card-body p-1">
                      <div className="product-search-area mb-3 mt-2">
                        <div className="input-group">
                          <input
                            type={"search"}
                            className="form-control form-control-sm"
                            name="search"
                            placeholder="Search Product"
                            onChange={handleInput}
                            value={input.search}
                          />
                          <button
                            onClick={getProducts}
                            className={"input-group-text bg-theme text-white"}
                          >
                            <i className="fa-solid fa-search" />
                          </button>
                        </div>
                      </div>
                      <ul className="list-unstyled">
                        {products.map((product, index) => (
                          <div
                            className="d-flex align-items-center p-2 position-relative order-product-container"
                            key={index}
                          >
                            <div className="details-area">
                              <button className={"btn btn-sm btn-info ms-1"}>
                                <i className="fa-solid fa-eye" />
                              </button>
                              <button
                                className={"btn btn-sm btn-success ms-1"}
                                onClick={() => handleCart(product.id)}
                              >
                                <i className="fa-solid fa-plus" />
                              </button>
                            </div>
                            <div className="flex-shrink-0">
                              <img
                                className={"order-product-photo img-thumbnail"}
                                src={product.primary_photo}
                                alt="..."
                              />
                            </div>
                            <div className="flex-grow-1 ms-2">
                              <p className={"text-theme"}>
                                <strong>{product.name}</strong>
                              </p>
                              <p>
                                <small>Original Price: {product.price}</small>
                              </p>
                              <p className={"text-theme"}>
                                <small>
                                  Price: {product.sell_price.price}{" "}
                                  {product.sell_price.symbol}| Discount:{" "}
                                  {product.sell_price.discount}{" "}
                                  {product.sell_price.symbol}
                                </small>
                              </p>
                              <p>
                                <small>
                                  SKU: {product.sku} | Stock:
                                  {product.stock}
                                </small>
                              </p>
                            </div>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h5>Cart</h5>
                    </div>
                    <div className="card-body p-1">
                      <div className="order-summery mt-2">
                        <p className={"pb-2 ms-1"}>
                          <strong>Customer: </strong>
                          <span className={"text-theme"}>
                            {orderSummary.customer}
                          </span>
                        </p>
                        <table
                          className={
                            "table-sm table table-hover table-stripped table-bordered"
                          }
                        >
                          <tbody>
                            <tr>
                              <th>Total Items</th>
                              <td className="text-end">{orderSummary.items}</td>
                            </tr>
                            <tr>
                              <th>Original Price</th>
                              <td className="text-end">
                                {orderSummary.amount}৳
                              </td>
                            </tr>
                            <tr>
                              <th>Discount</th>
                              <td className="text-end">
                                - {orderSummary.discount}৳
                              </td>
                            </tr>
                            <tr>
                              <th>Net Payable</th>
                              <th className="text-end text-theme">
                                {orderSummary.payable}৳
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {Object.keys(carts).map((key) => (
                        <div
                          className="d-flex align-items-center p-2  position-relative order-product-container"
                          key={key}
                        >
                          <div className="details-area">
                            <button className={"btn btn-sm btn-info ms-1"}>
                              <i className="fa-solid fa-eye" />
                            </button>
                            <button
                              className={"btn btn-sm btn-danger ms-1"}
                              onClick={() => removeCartItem(key)}
                            >
                              <i className="fa-solid fa-times" />
                            </button>
                          </div>
                          <div className="flex-shrink-0">
                            <img
                              className={"order-product-photo img-thumbnail"}
                              src={carts[key].primary_photo}
                              alt="..."
                            />
                          </div>
                          <div className="flex-grow-1 ms-2">
                            <p className={"text-theme"}>
                              <strong>{carts[key].name}</strong>
                            </p>
                            <p>
                              <small>Original Price: {carts[key].price}</small>
                            </p>
                            <p className={"text-theme"}>
                              <small>
                                Price: {carts[key].sell_price.price}{" "}
                                {carts[key].sell_price.symbol}| Discount:{" "}
                                {carts[key].sell_price.discount}{" "}
                                {carts[key].sell_price.symbol}
                              </small>
                            </p>
                            <p>
                              <small>
                                SKU: {carts[key].sku} | Stock:
                                {carts[key].stock}
                              </small>
                              <p>
                                Quantity :
                                <button
                                  disabled={carts[key].quantity <= 1}
                                  onClick={() => handleDecrease(carts[key].id)}
                                  className={"quantity-button"}
                                >
                                  -
                                </button>
                                <span>{carts[key].quantity}</span>
                                <button
                                  disabled={
                                    carts[key].quantity >= carts[key].stock
                                  }
                                  onClick={() => handleIncrease(carts[key].id)}
                                  className={"quantity-button"}
                                >
                                  +
                                </button>
                              </p>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <div className="d-flex justify-content-between">
                        <h5>Customer List</h5>
                        <button
                          onClick={() => setModalShow(true)}
                          className={"btn btn-sm btn-success py-0 px-2"}
                        >
                          <i className="fa-solid fa-plus" />
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="input-group">
                        <input
                          type={"search"}
                          className="form-control form-control-sm"
                          name="search"
                          placeholder="Search..."
                          onChange={handleCustomerSearch}
                          value={customerInput}
                        />
                        <button
                          onClick={getCustomer}
                          className={"input-group-text bg-theme text-white"}
                        >
                          <i className="fa-solid fa-search" />
                        </button>
                      </div>
                      <ul className={"customer-list"}>
                        {customers.map((customer, index) => (
                          <li
                            className={
                              orderSummary.customer_id == customer.id
                                ? "text-theme order-product-container p-1"
                                : "order-product-container p-1"
                            }
                            onClick={() => selectCustomer(customer)}
                            key={index}
                          >
                            {customer.name} - {customer.phone}
                          </li>
                        ))}
                      </ul>
                      <div className="d-grid mt-3">
                        <button
                          onClick={() => setModalOrderConfirmationShow(true)}
                          className={"btn theme-button"}
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddCustomer show={modalShow} onHide={() => setModalShow(false)} />
      <ShowOrderConfirmation
        show={modalOrderConfirmationShow}
        onHide={() => setModalOrderConfirmationShow(false)}
      />
    </>
  );
};

export default OrderCreate;
