import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import logo from "./../../../assets/images/bp_logo_slogan.png";
import GetLocalStorageItem from "../../utils/GetLocalStorageItem";
import Moment from "react-moment";

const ShowOrderConfirmation = ({
  handleOrderPlace,
  handleOrderSummaryInput,
  ...props
}) => {
  const [branch, setBranch] = useState({});

  useEffect(() => {
    let branch = GetLocalStorageItem("branch");
    if (branch) {
      setBranch(branch);
    }
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Order Details Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="order-details-confirmation">
          <div className="row px-4 align-content-center">
            <div className="col-md-6">
              {Object.keys(branch).length > 0 ? (
                <>
                  <img src={logo} alt="logo" className="img-thumbnail w-50" />
                </>
              ) : null}
            </div>
            <div className="col-md-6 text-end">
              <h4>ORDER DETAILS</h4>
            </div>
            <div className="col-md-6">
              {Object.keys(branch).length > 0 ? (
                <>
                  <p>
                    {" "}
                    <strong>{branch.name}</strong>
                  </p>
                  <address>
                    {branch.address.address}, {branch.address.area},{" "}
                    {branch.address.district}, {branch.address.division}{" "}
                  </address>
                  <p>
                    <small>Phone: {branch.phone}</small>
                  </p>
                </>
              ) : null}
            </div>
            <div className="col-md-6 text-end">
              <p>
                <strong>
                  <Moment format="DD MMM, YYYY">{new Date()}</Moment>
                </strong>
              </p>
              <h6>Customer Details</h6>
              <div className="customer-details">
                <p>
                  Name:{" "}
                  <span>{props.order_summary.customer.split("-")[0]}</span>
                </p>
                <p>
                  Phone:{" "}
                  <span>{props.order_summary.customer.split("-")[1]}</span>
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <table
                className={
                  "table table-sm table-hover table-stripped table-bordered mt-4"
                }
              >
                <thead className={"text-center"}>
                  <tr>
                    <th>SL</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(props.carts).map((key, index) => (
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{props.carts[key].name}</td>
                      <td className="text-center">
                        {props.carts[key].quantity}
                      </td>
                      <td className="text-end">
                        {new Intl.NumberFormat("us").format(
                          props.carts[key].price
                        )}
                        ৳
                      </td>
                      <td className="text-end">
                        {new Intl.NumberFormat("us").format(
                          props.carts[key].original_price *
                            props.carts[key].quantity
                        )}
                        ৳
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="4" className="text-end">
                      <strong>Sub Total</strong>
                    </th>
                    <th className="text-end">
                      {new Intl.NumberFormat("us").format(
                        props.order_summary.amount
                      )}
                      ৳
                    </th>
                  </tr>
                  <tr>
                    <th colSpan="4" className="text-end">
                      <strong>Discount</strong>
                    </th>
                    <th className="text-end">
                      -
                      {new Intl.NumberFormat("us").format(
                        props.order_summary.discount
                      )}
                      ৳
                    </th>
                  </tr>
                  <tr>
                    <th colSpan="4" className="text-end">
                      <strong>Total</strong>
                    </th>
                    <th className="text-end">
                      {new Intl.NumberFormat("us").format(
                        props.order_summary.payable
                      )}
                      ৳
                    </th>
                  </tr>
                  <tr>
                    <th
                      colSpan="4"
                      className="text-end text-theme align-middle"
                    >
                      <strong>Paid Amount</strong>
                    </th>
                    <th className="text-end align-middle">
                      <div className="input-group">
                        <input
                          className={"form-control form-control-sm text-end"}
                          type={"number"}
                          name={"paid_amount"}
                          value={props.order_summary.paid_amount}
                          onChange={handleOrderSummaryInput}
                          style={{ width: "35px" }}
                        />
                        <div className={"input-group-text"}>৳</div>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th colSpan="4" className="text-end">
                      <strong>Due Amount</strong>
                    </th>
                    <th className="text-end">
                      {new Intl.NumberFormat("us").format(
                        props.order_summary.due_amount
                      )}
                      ৳
                    </th>
                  </tr>
                  <tr>
                    <th colSpan="4" className="text-end text-theme">
                      <strong>Select Payment Method</strong>
                    </th>
                    <th className="text-end">
                      <select
                        className={"form-select-sm form-select"}
                        name={"payment_method_id"}
                        value={props.order_summary.payment_method_id}
                        onChange={handleOrderSummaryInput}
                      >
                        {props.paymentMethods.map((payment_method, intex) => (
                          <option key={intex} value={payment_method.id}>
                            {payment_method.name}
                          </option>
                        ))}
                      </select>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="px-4">
          <button className={"btn btn-danger btn-sm"} onClick={props.onHide}>
            Close
          </button>
          <button
            className={"btn theme-button btn-sm ms-2"}
            onClick={handleOrderPlace}
            dangerouslySetInnerHTML={{
              __html: props.is_loading
                ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...'
                : "Confirm",
            }}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowOrderConfirmation;
