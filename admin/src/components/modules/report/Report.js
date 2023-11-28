/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../../utils/ErrorMsg";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import Spinner from "../../utils/Spinner";
import Swal from "sweetalert2";
import CardHeader from "../../partials/miniComponent/CardHeader";

const Report = () => {
  const [report, setReport] = useState([]);

  const getReport = () => {
    axiosInstance.get(`${Constants.BASE_URL}/get-reports`).then((res) => {
      setReport(res.data);
    });
  };

  useEffect(() => {
    getReport();
  }, []);

  return (
    <>
      <BreadCrumb title={"Report"} location={"Dashboard"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Report"}
                link={"#"}
                icon={"fa-list"}
                button_text={"List"}
                hide={true}
              />
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Sales (Branch)</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-cart-shopping fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Total Sales</h6>
                                  <h5>12,258</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-cart-plus fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Total Purchase</h6>
                                  <h5>12,258</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-rotate-left fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Total Sales Return</h6>
                                  <h5>12,258</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-rotate-left fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Purchage Return</h6>
                                  <h5>12,258</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 mt-4">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-rotate-right fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Today's Sale</h6>
                                  <h5>12,258</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 mt-4">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-rotate-right fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Today's Purchage</h6>
                                  <h5>12,258</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 mt-4">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-rotate-right fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Today's Sale Return</h6>
                                  <h5>12,258</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 mt-4">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-rotate-right fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Purchage Return</h6>
                                  <h5>12,258</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Stock</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-box-open fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Total Product</h6>
                                  <h5>{report.total_product}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-box fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Total Stock</h6>
                                  <h5>{report.total_stock}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-battery-quarter fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Total Low Stock</h6>
                                  <h5>{report.low_stock}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-dollar-sign fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Total Stock Value (Buy)</h6>
                                  <h5>{report.buy_value}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 mt-4">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-dollar-sign fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Total Stock Value (Sale)</h6>
                                  <h5>{report.sale_value}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 mt-4">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-dollar-sign fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Potential Profit</h6>
                                  <h5>{report.potential_profit}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Expense (Branch)</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-cart-shopping fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Total Sales</h6>
                                  <h5>12,258</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-cart-plus fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Total Purchase</h6>
                                  <h5>12,258</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Withdrawals (Branch)</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-cart-shopping fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Total Sales</h6>
                                  <h5>12,258</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-cart-plus fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Total Purchase</h6>
                                  <h5>12,258</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Profit</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-cart-shopping fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Total Sales</h6>
                                  <h5>12,258</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card report-card">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <i className="fa-solid fa-cart-plus fa-2x"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Total Purchase</h6>
                                  <h5>12,258</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
