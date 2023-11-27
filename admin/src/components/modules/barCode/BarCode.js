/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import Spinner from "../../utils/Spinner";
import CardHeader from "../../partials/miniComponent/CardHeader";
import Loader from "../../partials/miniComponent/Loader";
import BarCodePage from "./BarCodePage";
import ReactToPring, { useReactToPrint } from "react-to-print";

const BarCode = () => {
  const componentRef = useRef();
  const [input, setInput] = useState({
    category_id: "",
    sub_category_id: "",
    name: "",
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [paperSize, setPaperSize] = useState({
    a4: {
      width: 595,
      height: 842,
    },
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleInput = (e) => {
    if (e.target.name === "category_id") {
      let category_id = parseInt(e.target.value);
      if (!Number.isNaN(category_id)) {
        getSubCategories(category_id);
      }
    }
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getCategories = () => {
    axiosInstance.get(`${Constants.BASE_URL}/get-category-list`).then((res) => {
      setCategories(res.data);
    });
  };

  const getSubCategories = (category_id) => {
    axiosInstance
      .get(`${Constants.BASE_URL}/get-sub-category-list/${category_id}`)
      .then((res) => {
        setSubCategories(res.data);
      });
  };

  const handleProductSearch = () => {
    setIsLoading(true);
    axiosInstance
      .get(
        `${Constants.BASE_URL}/get-product-list-for-bar-code?name=${input?.name}&category_id=${input?.category_id}&sub_category_id=${input?.sub_category_id}`
      )
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <BreadCrumb
        title={"Generate and Print Bar Code"}
        location={"Dashboard"}
      />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Generate and Print Bar Code"}
                link={"#"}
                icon={"fa-list"}
                button_text={"List"}
                hide={true}
              />
            </div>
            <div className="card-body">
              <div className="row align-items-baseline">
                <div className="col-md-3">
                  <label className="w-100 mt-4 mt-md-0">
                    <p>Select Category</p>
                    <select
                      className={"form-select mt-2"}
                      name={"category_id"}
                      value={input.category_id}
                      onChange={handleInput}
                      placeholder="Select Category"
                    >
                      <option disabled={true} value={""}>
                        Select Status
                      </option>
                      {categories.map((category, index) => (
                        <option value={category.id} key={index}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="col-md-3">
                  <label className="w-100 mt-4 mt-md-0">
                    <p>Select Sub Category</p>
                    <select
                      className={"form-select mt-2"}
                      name={"sub_category_id"}
                      value={input.sub_category_id}
                      onChange={handleInput}
                      placeholder="Select Category"
                      disabled={input.category_id == undefined}
                    >
                      <option value={""}>Select Sub Category</option>
                      {subCategories.map((sub_category, index) => (
                        <option value={sub_category.id} key={index}>
                          {sub_category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="col-md-4">
                  <label className="w-100 mt-4 mt-md-0">
                    <p>Product Name</p>
                    <input
                      className={"form-control mt-2"}
                      name={"name"}
                      type={"search"}
                      value={input.name}
                      onChange={handleInput}
                      placeholder="Enter Product Name"
                    />
                  </label>
                </div>
                <div className="col-md-2">
                  <div className="d-grid mt-4">
                    {isLoading && <Spinner text={"Loding"} />}
                    {!isLoading && (
                      <button
                        className={"btn theme-button"}
                        onClick={handleProductSearch}
                      >
                        Search
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div
                className="print-area-parent"
                style={{
                  display: Object.keys(products).length > 0 ? "block" : "none",
                }}
              >
                <button
                  className={"btn theme-button float-end mt-2"}
                  onClick={handlePrint}
                >
                  Print!
                </button>
                <div className="bar-code-area-wrapper">
                  <BarCodePage
                    products={products}
                    paperSize={paperSize}
                    isLoading={isLoading}
                    Loader={Loader}
                    ref={componentRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarCode;
