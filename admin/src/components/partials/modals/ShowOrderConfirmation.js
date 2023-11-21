import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import logo from "./../../../assets/images/bp_logo_slogan.png";
import GetLocalStorageItem from "../../utils/GetLocalStorageItem";

const ShowOrderConfirmation = (props) => {
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
          <div className="row px-4">
            <div className="col-md-6">
              {Object.keys(branch).length > 0 ? (
                <>
                  <img src={logo} alt="logo" className="img-thumbnail w-50" />
                  {/* <img
                    src={branch.logo}
                    alt="logo"
                    className="img-thumbnail w-50"
                  /> */}
                  <p>
                    {" "}
                    <strong>{branch.name}</strong>
                  </p>
                  <address>
                    {branch.address.address}, {branch.address.area},{" "}
                    {branch.address.district}, {branch.address.division}{" "}
                  </address>
                  <p>Phone: {branch.phone}</p>
                </>
              ) : null}
            </div>
            <div className="col-md-6 text-end">
              <h4>ORDER DETAILS</h4>
            </div>
            <div className="col-md-12 text-end">
              <p>
                <strong>23rd March, 2023</strong>
              </p>
              <h5>Customer Details</h5>
              <div className="customer-details">
                <p>
                  Name: <span>Naim</span>
                </p>
                <p>
                  Phone: <span>01813-551621</span>
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <table
                className={
                  "table table-hover table-stripped table-bordered mt-4"
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
                  <tr>
                    <td>1</td>
                    <td>Panjabi</td>
                    <td className="text-center">1</td>
                    <td className="text-end">1200</td>
                    <td className="text-end">1200</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="text-end">
                      <strong>Sub Total</strong>
                    </td>
                    <td className="text-end">1200</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="text-end">
                      <strong>Discount</strong>
                    </td>
                    <td className="text-end">-100</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="text-end">
                      <strong>Total</strong>
                    </td>
                    <td className="text-end">1000</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="px-4">
          <button className={"btn btn-danger"} onClick={props.onHide}>
            Close
          </button>
          <button className={"btn theme-button ms-2"} onClick={props.onHide}>
            Confirm
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowOrderConfirmation;
