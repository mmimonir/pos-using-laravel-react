/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import ErrorMsg from "../../utils/ErrorMsg";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import Spinner from "../../utils/Spinner";
import Swal from "sweetalert2";
import CardHeader from "../../partials/miniComponent/CardHeader";

const AddProduct = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ status: 1 });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [countries, setCountries] = useState([]);
  const [providers, setProviders] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const getCountries = () => {
    axiosInstance.get(`${Constants.BASE_URL}/get-country-list`).then((res) => {
      setCountries(res.data);
    });
  };

  const getCategories = () => {
    axiosInstance.get(`${Constants.BASE_URL}/get-category-list`).then((res) => {
      setCategories(res.data);
    });
  };
  const getBrands = () => {
    axiosInstance.get(`${Constants.BASE_URL}/get-brand-list`).then((res) => {
      setBrands(res.data);
    });
  };
  const getSubCategories = (category_id) => {
    axiosInstance
      .get(`${Constants.BASE_URL}/get-sub-category-list/${category_id}`)
      .then((res) => {
        setSubCategories(res.data);
      });
  };

  const handleInput = (e) => {
    if (e.target.name === "name") {
      let slug = e.target.value.toLowerCase().replaceAll(" ", "-");
      setInput((prevState) => ({
        ...prevState,
        slug: slug,
      }));
    } else if (e.target.name === "category_id") {
      let category_id = parseInt(e.target.value);
      if (!Number.isNaN(category_id)) {
        getSubCategories(e.target.value);
      }
    }

    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrors([]);
  };

  const handleProductCreate = () => {
    setIsLoading(true);
    axiosInstance
      .post(`${Constants.BASE_URL}/product`, input)
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
        navigate("/product");
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
    getCategories();
    getBrands();
    getCountries();
  }, []);

  return (
    <>
      <BreadCrumb title={"Add Product"} location={"Dashboard"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Add Product"}
                link={"/product"}
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
                      placeholder="Enter Product Name"
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
                    <p>Category</p>
                    <select
                      className={
                        errors.category_id !== undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"category_id"}
                      value={input.category_id}
                      onChange={handleInput}
                      placeholder="Enter product category"
                    >
                      <option disabled={true} value={""} selected>
                        Select Category
                      </option>
                      {categories.map((category, index) => (
                        <option value={category.id}> {category.name} </option>
                      ))}
                    </select>
                    {errors.category_id && (
                      <ErrorMsg errorMsg={errors.category_id[0]} />
                    )}
                  </label>
                </div>
                <div className="col-md-6 col-sm-12">
                  <label className="w-100 mt-4">
                    <p>Sub Category</p>
                    <select
                      className={
                        errors.sub_category_id !== undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"sub_category_id"}
                      value={input.sub_category_id}
                      onChange={handleInput}
                      placeholder="Enter product sub category"
                      disabled={subCategories.length === 0}
                    >
                      <option>Select Sub Category</option>
                      {subCategories.map((sub_category, index) => (
                        <option value={sub_category.id}>
                          {" "}
                          {sub_category.name}{" "}
                        </option>
                      ))}
                    </select>
                    {errors.sub_category_id && (
                      <ErrorMsg errorMsg={errors.sub_category_id[0]} />
                    )}
                  </label>
                </div>
                <div className="col-md-6 col-sm-12">
                  <label className="w-100 mt-4">
                    <p>Brands</p>
                    <select
                      className={
                        errors.brand_id !== undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"sub_category_id"}
                      value={input.brand_id}
                      onChange={handleInput}
                      placeholder="Enter product Brand"
                      disabled={brands.length === 0}
                    >
                      <option>Select Brand</option>
                      {brands.map((brand, index) => (
                        <option value={brand.id} key={index}>
                          {" "}
                          {brand.name}{" "}
                        </option>
                      ))}
                    </select>
                    {errors.brand_id && (
                      <ErrorMsg errorMsg={errors.brand_id[0]} />
                    )}
                  </label>
                </div>
                <div className="col-md-6 col-sm-12">
                  <label className="w-100 mt-4">
                    <p>Product Origin</p>
                    <select
                      className={
                        errors.country_id !== undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"sub_category_id"}
                      value={input.country_id}
                      onChange={handleInput}
                      placeholder="Enter product Country"
                      disabled={countries.length === 0}
                    >
                      <option>Select Country</option>
                      {countries.map((country, index) => (
                        <option value={country.id} key={index}>
                          {" "}
                          {country.name}{" "}
                        </option>
                      ))}
                    </select>
                    {errors.country_id && (
                      <ErrorMsg errorMsg={errors.country_id[0]} />
                    )}
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
                      placeholder="Enter product status"
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
                      placeholder="Enter product description"
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
                      placeholder="Enter product description"
                    />
                    {errors.photo && <ErrorMsg errorMsg={errors.photo[0]} />}
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
                </div>
                <div className="col-md-12 col-sm-12">
                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <div className="d-grid mt-4">
                        {isLoading && <Spinner text={"Loding"} />}
                        {!isLoading && (
                          <button
                            className={"btn theme-button"}
                            onClick={handleProductCreate}
                          >
                            Add Product
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

export default AddProduct;
