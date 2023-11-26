import BreadCrumb from "../../partials/BreadCrumb";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMsg from "../../utils/ErrorMsg";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import Swal from "sweetalert2";
import CardHeader from "../../partials/miniComponent/CardHeader";
import GlobalFunction from "../../../GlobalFunction";
import Loader from "../../partials/miniComponent/Loader";

const OrderDetails = () => {
  const params = useParams();
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrderDetails = () => {
    setIsLoading(true);
    axiosInstance
      .get(`${Constants.BASE_URL}/order/${params.id}`)
      .then((res) => {
        console.log("Order Details", res.data.data);
        setOrder(res.data.data);
        // console.log("Order Details", order.length);
        setIsLoading(false);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  useEffect(() => {
    getOrderDetails();
    console.log("Order Details", order.order_details);
  }, []);

  return (
    <>
      <BreadCrumb title={"Order Details"} location={"Dashboard"} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <CardHeader
                  title={`${order?.order_number} Order Details`}
                  link={"/order"}
                  icon={"fa-list"}
                  button_text={"List"}
                />
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <h5>Customer Details</h5>
                      </div>
                      <div className="card-body">
                        <table
                          className={
                            "table table-hover table-bordered table-striped sm-table"
                          }
                        >
                          <tbody>
                            <tr>
                              <th>Name</th>
                              <td>{order?.customer?.name}</td>
                            </tr>
                            <tr>
                              <th>Phone</th>
                              <td>{order?.customer?.phone}</td>
                            </tr>
                            <tr>
                              <th>Email</th>
                              <td>{order?.customer?.email}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <h5>Shop Details</h5>
                      </div>
                      <div className="card-body">
                        <table
                          className={
                            "table table-hover table-bordered table-striped sm-table"
                          }
                        >
                          <tbody>
                            <tr>
                              <th className={"align-middle"}>Shop</th>
                              <td className={"align-middle"}>
                                <img
                                  src={order?.shop?.logo}
                                  alt={"shop logo"}
                                  className={"table-image img-thumbnail me-2"}
                                />
                                {order?.shop?.name}{" "}
                              </td>
                            </tr>
                            <tr>
                              <th className={"align-middle"}>Sales Mangr.</th>
                              <td className={"align-middle"}>
                                <img
                                  src={order?.sales_manager?.photo}
                                  alt={"shop logo"}
                                  className={"table-image img-thumbnail me-2"}
                                />
                                {order?.sales_manager?.name}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    <div className="card h-100">
                      <div className="card-header">
                        <h5>Order Summary</h5>
                      </div>
                      <div className="card-body">
                        <table
                          className={
                            "table table-hover table-bordered table-striped sm-table"
                          }
                        >
                          <tbody>
                            <tr>
                              <th className={"align-middle"}>Order Number</th>
                              <td>
                                <strong className={"text-theme"}>
                                  {order?.order_number}
                                </strong>
                              </td>
                              <th className={"align-middle"}>Total Items</th>
                              <td className={"align-middle"}>
                                {order?.quantity}
                              </td>
                            </tr>
                            <tr>
                              <th className={"align-middle"}>Order Status</th>
                              <td className={"align-middle"}>
                                {order?.order_status_string}
                              </td>
                              <th className={"align-middle"}>Payment Status</th>
                              <td className={"align-middle"}>
                                {order?.payment_status}
                              </td>
                            </tr>
                            <tr>
                              <th className={"align-middle"}>Payment Method</th>
                              <td className={"align-middle"}>
                                {order?.payment_method?.name}
                              </td>
                              <th className={"align-middle"}>Account Number</th>
                              <td className={"align-middle"}>
                                {order?.payment_method?.account_number}
                              </td>
                            </tr>
                            <tr>
                              <th className={"align-middle"}>Sub Total</th>
                              <td className={"align-middle"}>
                                {GlobalFunction.formatPrice(order?.sub_total)}
                              </td>
                              <th className={"align-middle"}>Discount</th>
                              <td className={"align-middle"}>
                                {GlobalFunction.formatPrice(order?.discount)}
                              </td>
                            </tr>
                            <tr>
                              <th className={"align-middle"}>Total</th>
                              <td className={"align-middle"}>
                                <strong className={"text-theme"}>
                                  {GlobalFunction.formatPrice(order?.total)}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <th className={"align-middle"}>Paid Amount</th>
                              <td className={"align-middle"}>
                                <strong className={"text-success"}>
                                  {GlobalFunction.formatPrice(
                                    order?.paid_amount
                                  )}
                                </strong>
                              </td>
                              <th className={"align-middle"}>Due Amount</th>
                              <td className={"align-middle"}>
                                <strong className={"text-danger"}>
                                  {GlobalFunction.formatPrice(
                                    order?.due_amount
                                  )}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <th className={"align-middle"}>Order Placed</th>
                              <td className={"align-middle"}>
                                {order?.created_at}
                              </td>
                              <th className={"align-middle"}>Order Updated</th>
                              <td className={"align-middle"}>
                                {order?.updated_at}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    <div className="card h-100">
                      <div className="card-header">
                        <h5>Order Items Details</h5>
                      </div>
                      <div className="card-body">
                        <table
                          className={
                            "table table-hover table-bordered table-striped sm-table"
                          }
                        >
                          <thead>
                            <th>Sl</th>
                            <th>Name</th>
                            <th>Info</th>
                            <th>Quantity</th>
                            <th>Photo</th>
                            <th>Amounts</th>
                            <th>Sub Total</th>
                          </thead>
                          <tbody>
                            {order?.order_details?.map((product, index) => (
                              <tr key={index}>
                                <td className={"align-middle"}>{++index}</td>
                                <td className={"align-middle"}>
                                  <p>{product.name}</p>
                                  <p className={"text-theme"}>
                                    SKU: {product.sku}
                                  </p>
                                  <p>Supplier: {product.supplier}</p>
                                </td>
                                <td className={"align-middle"}>
                                  <p>Brand: {product.brand}</p>
                                  <p className={"text-theme"}>
                                    Category: {product.category}
                                  </p>
                                  <p>Sub Supplier: {product.sub_category}</p>
                                </td>
                                <td className={"align-middle"}>
                                  {product.quantity}
                                </td>
                                <td className={"align-middle"}>
                                  <img
                                    src={product.photo}
                                    alt={"shop logo"}
                                    className={"table-image img-thumbnail"}
                                  />
                                </td>
                                <td className={"align-middle"}>
                                  <p>
                                    Unit Price:{" "}
                                    {GlobalFunction.formatPrice(product.price)}
                                  </p>
                                  <p className={"text-theme"}>
                                    Discount:{" "}
                                    {GlobalFunction.formatPrice(
                                      product?.sell_price?.discount
                                    )}
                                  </p>
                                  <p>
                                    Sale Price:{" "}
                                    {GlobalFunction.formatPrice(
                                      product?.sell_price?.price
                                    )}
                                  </p>
                                </td>
                                <td className={"align-middle text-end"}>
                                  {GlobalFunction.formatPrice(
                                    product?.sell_price?.price *
                                      product.quantity
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4 mb-5">
                    <div className="card h-100">
                      <div className="card-header">
                        <h5>Transactions</h5>
                      </div>
                      <div className="card-body">
                        <table
                          className={
                            "table table-hover table-bordered table-striped sm-table"
                          }
                        >
                          <thead>
                            <th>Sl</th>
                            <th>Trs ID</th>
                            <th>Amount</th>
                            <th>Customer</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>Transaction By</th>
                            <th>Created at</th>
                          </thead>
                          <tbody>
                            {order?.transactions?.map((transaction, index) => (
                              <tr key={index}>
                                <td className={"align-middle"}>{++index}</td>
                                <td className={"align-middle"}>
                                  {transaction.trx_id}
                                </td>
                                <td className={"align-middle"}>
                                  {GlobalFunction.formatPrice(
                                    transaction.amount
                                  )}
                                </td>
                                <td className={"align-middle"}>
                                  <p>Name: {transaction.customer_name}</p>
                                  <p className={"text-theme"}>
                                    Phone: {transaction.customer_phone}
                                  </p>
                                </td>
                                <td className={"align-middle"}>
                                  <p>Name: {transaction.payment_method_name}</p>
                                  <p className={"text-theme"}>
                                    Account No: {transaction.account_number}
                                  </p>
                                </td>
                                <td className={"align-middle"}>
                                  <p>Status: {transaction.status}</p>
                                  <p className={"text-theme"}>
                                    Trx. Type: {transaction.transaction_type}
                                  </p>
                                </td>
                                <td className={"align-middle"}>
                                  {transaction.transaction_by}
                                </td>
                                <td className={"align-middle"}>
                                  {transaction.created_at}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OrderDetails;
