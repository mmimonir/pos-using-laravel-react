import React, { useState, useEffect } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorMsg from "../../utils/ErrorMsg";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import Spinner from "../../utils/Spinner";
import Swal from "sweetalert2";
import CardHeader from "../../partials/miniComponent/CardHeader";

const SubCategoryEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({ status: 1 });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axiosInstance.get(`${Constants.BASE_URL}/get-category-list`).then((res) => {
      setCategories(res.data);
    });
  };

  const getCategory = () => {
    axiosInstance
      .get(`${Constants.BASE_URL}/sub-category/${params.id}`)
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
  const handleCategoryUpdate = () => {
    setIsLoading(true);
    axiosInstance
      .put(`${Constants.BASE_URL}/sub-category/${params.id}`, input)
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
        navigate("/sub-category");
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
  const handlePhoto = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setInput((prevState) => ({
        ...prevState,
        photo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    getCategory();
    getCategories();
  }, []);
  return (
    <>
      <BreadCrumb title={"Edit Sub Category"} location={"Dashboard"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Edit Sub Category"}
                link={"/sub-category"}
                icon={"fa-list"}
                button_text={"List"}
              />
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <label className="w-100 mt-4">
                    <p>Select Category</p>
                    <select
                      className={
                        errors.category_id !== undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      name={"category_id"}
                      value={input.category_id}
                      onChange={handleInput}
                      placeholder="Enter sub category Name"
                    >
                      <option disabled={true}>Select Category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category_id && (
                      <ErrorMsg errorMsg={errors.category_id[0]} />
                    )}
                  </label>
                </div>
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
                      placeholder="Enter Sub Category Name"
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
                      placeholder="Enter Sub category serial"
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
                      placeholder="Enter Sub category status"
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
                      placeholder="Enter Sub category description"
                    />
                    {errors.description && (
                      <ErrorMsg errorMsg={errors.description[0]} />
                    )}
                  </label>
                </div>
                <div className="col-md-6 col-sm-12">
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
                      onChange={handlePhoto}
                      placeholder="Enter Sub category description"
                    />
                    {errors.photo && <ErrorMsg errorMsg={errors.photo[0]} />}
                  </label>
                  {input.photo !== undefined ||
                  input.photo_preview !== undefined ? (
                    <div className="row">
                      <div className="col-6">
                        <div className="photo-preview mt-3">
                          <img
                            src={
                              input.photo == undefined
                                ? input.photo_preview
                                : input.photo
                            }
                            alt="Photo preview"
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
                            onClick={handleCategoryUpdate}
                          >
                            Update Sub Category
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

export default SubCategoryEdit;
