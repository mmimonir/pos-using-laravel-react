import React, { useState, useEffect } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorMsg from "../../utils/ErrorMsg";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import Spinner from "../../utils/Spinner";
import Swal from "sweetalert2";
import CardHeader from "../../partials/miniComponent/CardHeader";

const BrandEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({ status: 1 });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [brand, setBrand] = useState([]);

  const getBrand = () => {
    axiosInstance
      .get(`${Constants.BASE_URL}/brand/${params.id}`)
      .then((res) => {
        // setCategory(res.data.data);
        setInput(res.data.data);
      });
  };

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
  const handleBrandUpdate = () => {
    setIsLoading(true);
    axiosInstance
      .put(`${Constants.BASE_URL}/brand/${params.id}`, input)
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
  useEffect(() => {
    getBrand();
  }, []);
  return (
    <>
      <BreadCrumb title={"Edit Brand"} location={"Dashboard"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Edit Brand"}
                link={"/brand"}
                icon={"fa-list"}
                button_text={"List"}
              />
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <label className="w-100 mt-4">
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
                      placeholder="Enter Brand Name"
                    />
                    {errors.name && <ErrorMsg errorMsg={errors.name[0]} />}
                  </label>
                </div>
                <div className="col-md-6 col-sm-12">
                  <label className="w-100 mt-4">
                    <p>Slug</p>
                    <input
                      className={
                        errors.slug !== undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      name={"slug"}
                      type={"text"}
                      value={input.slug}
                      onChange={handleInput}
                      placeholder="Enter Slug Name"
                    />
                    {errors.slug && <ErrorMsg errorMsg={errors.slug[0]} />}
                  </label>
                </div>
                <div className="col-md-6 col-sm-12">
                  <label className="w-100 mt-4">
                    <p>Serial</p>
                    <input
                      className={
                        errors.slug !== undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      name={"serial"}
                      type={"number"}
                      value={input.serial}
                      onChange={handleInput}
                      placeholder="Enter Brand serial"
                    />
                    {errors.serial && <ErrorMsg errorMsg={errors.serial[0]} />}
                  </label>
                </div>
                <div className="col-md-6 col-sm-12">
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
                      placeholder="Enter Brand status"
                    >
                      <option disabled={true} value={""}>
                        Select Status
                      </option>
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                    {errors.status && <ErrorMsg errorMsg={errors.status[0]} />}
                  </label>
                </div>
                <div className="col-md-6 col-sm-12">
                  <label className="w-100 mt-4">
                    <p>Description</p>
                    <textarea
                      className={
                        errors.description !== undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      name={"description"}
                      value={input.description}
                      onChange={handleInput}
                      placeholder="Enter Brand description"
                    />
                    {errors.description && (
                      <ErrorMsg errorMsg={errors.description[0]} />
                    )}
                  </label>
                </div>
                <div className="col-md-6 col-sm-12">
                  <label className="w-100 mt-4">
                    <p>Logo</p>
                    <input
                      className={
                        errors.logo !== undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      name={"logo"}
                      type={"file"}
                      onChange={handleLogo}
                      placeholder="Enter Brand description"
                    />
                    {errors.logo && <ErrorMsg errorMsg={errors.logo[0]} />}
                  </label>
                  {input.logo !== undefined ||
                  input.logo_preview !== undefined ? (
                    <div className="row">
                      <div className="col-6">
                        <div className="photo-preview mt-3">
                          <img
                            src={
                              input.logo == undefined
                                ? input.logo_preview
                                : input.logo
                            }
                            alt="logo preview"
                            className={"img-thumbnail aspect-one"}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="col-md-12 col-sm-12">
                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <div className="d-grid mt-4">
                        {isLoading && <Spinner text={"Loding"} />}
                        {!isLoading && (
                          <button
                            className={"btn theme-button"}
                            onClick={handleBrandUpdate}
                          >
                            Update Brand
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

export default BrandEdit;
