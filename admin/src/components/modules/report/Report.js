/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../../utils/ErrorMsg";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import Spinner from "../../utils/Spinner";
import Swal from "sweetalert2";
import CardHeader from "../../partials/miniComponent/CardHeader";

const Report = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ status: 1 });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    if (e.target.name === "name") {
      let slug = e.target.value.toLowerCase().replaceAll(" ", "-");
      setInput((prevState) => ({
        ...prevState,
        slug: slug,
      }));
    }
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrors([]);
  };
  const handleBrandCreate = () => {
    setIsLoading(true);
    axiosInstance
      .post(`${Constants.BASE_URL}/brand`, input)
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
        navigate("/brand");
        // console.log(res.data);
      })
      .catch((errors) => {
        console.log(errors);
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };
  const handleLogo = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setInput((prevState) => ({
        ...prevState,
        logo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };
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
                          <h6>Total Sales Return</h6>
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
                          <h6>Total Product</h6>
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
    </>
  );
};

export default Report;
