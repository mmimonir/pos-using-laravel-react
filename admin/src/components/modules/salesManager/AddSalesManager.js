/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import ErrorMsg from "../../utils/ErrorMsg";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import Spinner from "../../utils/Spinner";
import Swal from "sweetalert2";
import CardHeader from "../../partials/miniComponent/CardHeader";

const AddSalesManager = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ status: 1 });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [shops, setShops] = useState([]);

  const getShops = () => {
    axiosInstance
      .get(`${Constants.BASE_URL}/get-shop-list`)
      .then((res) => {
        setShops(res.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  const getDivisions = () => {
    axiosInstance
      .get(`${Constants.BASE_URL}/divisions`)
      .then((res) => {
        setDivisions(res.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  const getDisctricts = (division_id) => {
    axiosInstance
      .get(`${Constants.BASE_URL}/districts/${division_id}`)
      .then((res) => {
        setDistricts(res.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  const getAreas = (district_id) => {
    axiosInstance
      .get(`${Constants.BASE_URL}/areas/${district_id}`)
      .then((res) => {
        setAreas(res.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const handleInput = (e) => {
    if (e.target.name === "division_id") {
      setDistricts([]);
      setAreas([]);
      let division_id = parseInt(e.target.value);
      if (!isNaN(division_id)) {
        getDisctricts(division_id);
      }
    } else if (e.target.name === "district_id") {
      setAreas([]);
      let district_id = parseInt(e.target.value);
      if (!isNaN(district_id)) {
        getAreas(district_id);
      }
    }
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrors([]);
  };
  const handleSalesManagerCreate = () => {
    setIsLoading(true);
    axiosInstance
      .post(`${Constants.BASE_URL}/sales-manager`, input)
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
        if (res.data.flag == undefined) {
          navigate("/sales-manager");
        }
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
        [e.target.name]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    getDivisions();
    getShops();
  }, []);
  return (
    <>
      <BreadCrumb title={"Add Sales Manager"} location={"Dashboard"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Add Sales Manager"}
                link={"/sales-manager"}
                icon={"fa-list"}
                button_text={"List"}
              />
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Sales Manager Details</h5>
                    </div>
                    <div className="card-body">
                      <label className="w-100">
                        <p>Name</p>
                        <input
                          className={
                            errors.name !== undefined
                              ? "form-control mt-2 is-invalid"
                              : "form-control mt-2"
                          }
                          name={"name"}
                          type={"text"}
                          value={input.name}
                          onChange={handleInput}
                          placeholder="Enter Sales Manager Name"
                        />
                        {errors.name && <ErrorMsg errorMsg={errors.name[0]} />}
                      </label>
                      <label className="w-100 mt-4">
                        <p>Phone</p>
                        <input
                          className={
                            errors.phone !== undefined
                              ? "form-control mt-2 is-invalid"
                              : "form-control mt-2"
                          }
                          name={"phone"}
                          type={"text"}
                          value={input.phone}
                          onChange={handleInput}
                          placeholder="Enter Sales Manager Phone Number"
                        />
                        {errors.phone && (
                          <ErrorMsg errorMsg={errors.phone[0]} />
                        )}
                      </label>
                      <label className="w-100 mt-4">
                        <p>Password</p>
                        <input
                          className={
                            errors.password !== undefined
                              ? "form-control mt-2 is-invalid"
                              : "form-control mt-2"
                          }
                          name={"password"}
                          type={"text"}
                          value={input.password}
                          onChange={handleInput}
                          placeholder="Enter Sales Manager Password."
                        />
                        {errors.password && (
                          <ErrorMsg errorMsg={errors.password[0]} />
                        )}
                      </label>
                      <label className="w-100 mt-4">
                        <p>Email Address</p>
                        <input
                          className={
                            errors.email !== undefined
                              ? "form-control mt-2 is-invalid"
                              : "form-control mt-2"
                          }
                          name={"email"}
                          type={"text"}
                          value={input.email}
                          onChange={handleInput}
                          placeholder="Enter Sales Manager Email Address"
                        />
                        {errors.email && (
                          <ErrorMsg errorMsg={errors.email[0]} />
                        )}
                      </label>
                      <label className="w-100 mt-4">
                        <p>NID/Passport/DL Number</p>
                        <input
                          className={
                            errors.nid !== undefined
                              ? "form-control mt-2 is-invalid"
                              : "form-control mt-2"
                          }
                          name={"nid"}
                          type={"text"}
                          value={input.nid}
                          onChange={handleInput}
                          placeholder="Enter NID/Passport/DL Number"
                        />
                        {errors.nid && <ErrorMsg errorMsg={errors.nid[0]} />}
                      </label>
                      <label className="w-100 mt-4">
                        <p>Working Shop</p>
                        <select
                          className={
                            errors.shop_id !== undefined
                              ? "form-select mt-2 is-invalid"
                              : "form-select mt-2"
                          }
                          name={"shop_id"}
                          value={input.shop_id}
                          onChange={handleInput}
                          placeholder="Select Shop"
                        >
                          <option disabled={true}>Select Shop</option>
                          {shops.map((shop, index) => (
                            <option key={index} value={shop.id}>
                              {shop.name}
                            </option>
                          ))}
                        </select>
                        {errors.shop_id && (
                          <ErrorMsg errorMsg={errors.shop_id[0]} />
                        )}
                      </label>
                      <label className="w-100 mt-4">
                        <p>Status</p>
                        <select
                          className={
                            errors.status !== undefined
                              ? "form-select mt-2 is-invalid"
                              : "form-select mt-2"
                          }
                          name={"status"}
                          value={input.status}
                          onChange={handleInput}
                          placeholder="Enter Sales Manager status"
                        >
                          <option disabled={true} value={""}>
                            Select Status
                          </option>
                          <option value={1}>Active</option>
                          <option value={0}>Inactive</option>
                        </select>
                        {errors.status && (
                          <ErrorMsg errorMsg={errors.status[0]} />
                        )}
                      </label>
                      <label className="w-100 mt-4">
                        <p>Bio</p>
                        <textarea
                          className={
                            errors.details !== undefined
                              ? "form-control mt-2 is-invalid"
                              : "form-control mt-2"
                          }
                          name={"bio"}
                          value={input.details}
                          onChange={handleInput}
                          placeholder="Enter Sales Manager Bio"
                        />
                        {errors.details && (
                          <ErrorMsg errorMsg={errors.details[0]} />
                        )}
                      </label>
                      <label className="w-100 mt-4">
                        <p>Photo</p>
                        <input
                          className={
                            errors.photo !== undefined
                              ? "form-control mt-2 is-invalid"
                              : "form-control mt-2"
                          }
                          name={"photo"}
                          type={"file"}
                          onChange={handleLogo}
                        />
                        {errors.photo && (
                          <ErrorMsg errorMsg={errors.photo[0]} />
                        )}
                      </label>
                      {input.photo && (
                        <div className="row">
                          <div className="col-6">
                            <div className="photo-preview mt-3">
                              <img
                                src={input.photo}
                                alt="Photo preview"
                                className={"img-thumbnail aspect-one"}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <label className="w-100 mt-4">
                        <p>NID/Passport/Driving License</p>
                        <input
                          className={
                            errors.nid_photo !== undefined
                              ? "form-control mt-2 is-invalid"
                              : "form-control mt-2"
                          }
                          name={"nid_photo"}
                          type={"file"}
                          onChange={handleLogo}
                        />
                        {errors.nid_photo && (
                          <ErrorMsg errorMsg={errors.nid_photo[0]} />
                        )}
                      </label>
                      {input.nid_photo && (
                        <div className="row">
                          <div className="col-6">
                            <div className="photo-preview mt-3">
                              <img
                                src={input.nid_photo}
                                alt="Photo preview"
                                className={"img-thumbnail aspect-one"}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Sales Manager Address</h5>
                    </div>
                    <div className="card-body">
                      <label className="w-100">
                        <p>
                          Address <small>(House/Road/Village etc)</small>
                        </p>
                        <input
                          className={
                            errors.address !== undefined
                              ? "form-control mt-2 is-invalid"
                              : "form-control mt-2"
                          }
                          name={"address"}
                          type={"text"}
                          value={input.address}
                          onChange={handleInput}
                          placeholder="Enter Sales Manager Address"
                        />
                        {errors.address && (
                          <ErrorMsg errorMsg={errors.address[0]} />
                        )}
                      </label>
                      <label className="w-100 mt-4">
                        <p>Select Division</p>
                        <select
                          className={
                            errors.division_id !== undefined
                              ? "form-select mt-2 is-invalid"
                              : "form-select mt-2"
                          }
                          name={"division_id"}
                          value={input.division_id}
                          onChange={handleInput}
                        >
                          <option disabled={false} value={""}>
                            Select Division
                          </option>
                          {divisions.map((division, index) => (
                            <option key={index} value={division.id}>
                              {division.name}
                            </option>
                          ))}
                        </select>
                        {errors.division_id && (
                          <ErrorMsg errorMsg={errors.division_id[0]} />
                        )}
                      </label>
                      <label className="w-100 mt-4">
                        <p>Select City</p>
                        <select
                          className={
                            errors.district_id !== undefined
                              ? "form-select mt-2 is-invalid"
                              : "form-select mt-2"
                          }
                          name={"district_id"}
                          value={input.district_id}
                          onChange={handleInput}
                          disabled={districts.length === 0}
                        >
                          <option disabled={false} value={""}>
                            Select City
                          </option>
                          {districts.map((district, index) => (
                            <option key={index} value={district.id}>
                              {district.name}
                            </option>
                          ))}
                        </select>
                        {errors.district_id && (
                          <ErrorMsg errorMsg={errors.district_id[0]} />
                        )}
                      </label>
                      <label className="w-100 mt-4">
                        <p>Select Area</p>
                        <select
                          className={
                            errors.area_id !== undefined
                              ? "form-select mt-2 is-invalid"
                              : "form-select mt-2"
                          }
                          name={"area_id"}
                          value={input.area_id}
                          onChange={handleInput}
                          disabled={areas.length === 0}
                        >
                          <option disabled={false} value={""}>
                            Select Your Area
                          </option>
                          {areas.map((area, index) => (
                            <option key={index} value={area.id}>
                              {area.name}
                            </option>
                          ))}
                        </select>
                        {errors.area_id && (
                          <ErrorMsg errorMsg={errors.area_id[0]} />
                        )}
                      </label>
                      <label className="w-100 mt-4">
                        <p>Landmark</p>
                        <input
                          className={
                            errors.landmark !== undefined
                              ? "form-control mt-2 is-invalid"
                              : "form-control mt-2"
                          }
                          name={"landmark"}
                          type={"text"}
                          value={input.landmark}
                          onChange={handleInput}
                          placeholder="Enter Landmark"
                        />
                        {errors.landmark && (
                          <ErrorMsg errorMsg={errors.landmark[0]} />
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <div className="d-grid mt-4">
                        {isLoading && <Spinner text={"Loding"} />}
                        {!isLoading && (
                          <button
                            className={"btn theme-button"}
                            onClick={handleSalesManagerCreate}
                          >
                            Add Sales Manager
                          </button>
                        )}
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

export default AddSalesManager;
