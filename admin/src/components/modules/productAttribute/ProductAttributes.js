import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import Modal from "react-bootstrap/Modal";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import Swal from "sweetalert2";
import ErrorMsg from "../../utils/ErrorMsg";
import { Link } from "react-router-dom";
import NoDataFound from "../../partials/miniComponent/NoDataFound";
import Loader from "../../partials/miniComponent/Loader";

const ProductAttributes = () => {
  const [modalShow, setModalShow] = useState(false);
  const [input, setInput] = useState({ status: 1 });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [modalTitle, setModalTitle] = useState("Add");
  const [valueModalTitle, setValueModalTitle] = useState("Add");
  const [valueModalShow, setValueModalShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleValueCreateModal = (id) => {
    setValueModalTitle("Add");
    setValueModalShow(true);
    setInput({ status: 1, attribute_id: id });
  };

  const handleValueCreate = () => {
    setIsLoading(true);
    axiosInstance
      .post(`${Constants.BASE_URL}/value`, input)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.msg,
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
        setIsLoading(false);
        setErrors([]);
        setInput({ status: 1 });
        setModalShow(false);
        getAttributes();
      })
      .catch((errors) => {
        console.log(errors);
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  const getAttributes = () => {
    setIsLoading(true);
    axiosInstance
      .get(`${Constants.BASE_URL}/attribute`)
      .then((res) => {
        setAttributes(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setTotalItemsCount(res.data.meta.total);
        setStartFrom(res.data.meta.from);
        setActivePage(res.data.meta.current_page);
        setIsLoading(false);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  const handleAttributeCreate = () => {
    setIsLoading(true);
    axiosInstance
      .post(`${Constants.BASE_URL}/attribute`, input)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.msg,
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
        setIsLoading(false);
        setErrors([]);
        setInput({ status: 1 });
        setModalShow(false);
        getAttributes();
      })
      .catch((errors) => {
        console.log(errors);
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };
  const handleAttributeUpdate = (id) => {
    setIsLoading(true);
    axiosInstance
      .put(`${Constants.BASE_URL}/attribute/${id}`, input)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.msg,
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
        setIsLoading(false);
        setErrors([]);
        setInput({ status: 1 });
        setModalShow(false);
        getAttributes();
      })
      .catch((errors) => {
        console.log(errors);
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };
  const handleModal = (attribute = undefined) => {
    setInput({ status: 1 });
    if (attribute !== undefined) {
      setModalTitle("Update");
      setIsEditMode(true);
      setInput({
        status: attribute.original_status,
        name: attribute.name,
        id: attribute.id,
      });
    } else {
      setIsEditMode(false);
      setModalTitle("Add");
    }
    setModalShow(true);
    setErrors([]);
  };

  const handleAttributeDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this attribute!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      setIsLoading(true);
      if (result.isConfirmed) {
        axiosInstance
          .delete(`${Constants.BASE_URL}/attribute/${id}`)
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
            getAttributes();
          })
          .catch((errors) => {
            console.log(errors);
            setIsLoading(false);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Cancelled",
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
      }
    });
  };

  useEffect(() => {
    getAttributes();
  }, []);
  return (
    <>
      <BreadCrumb title={"Product Attributes"} location={"Dashboard"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className={"text-theme"}>Product Attributes</h3>
                <button
                  onClick={() => handleModal()}
                  className={"btn theme-button"}
                >
                  <i className={`fa-solid fa-plus`}></i> Add
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <div className="table-responsive soft-landing">
                      <table className="my-table table table-hover table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Value</th>
                            <th>Status</th>
                            <th>Created By</th>
                            <th>Date Time</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(attributes).length > 0 ? (
                            attributes.map((attribute, index) => (
                              <tr key={index}>
                                <td>{startFrom + index}</td>
                                <td>{attribute.name}</td>
                                <td className={"w-225"}>
                                  <div className={"value-container-parent"}>
                                    {attribute.value != undefined
                                      ? attribute.value.map(
                                          (value, valIndex) => (
                                            <div className={"value-container"}>
                                              {value.name}
                                              <div className={"value-buttons"}>
                                                <button className="bg-info">
                                                  <i
                                                    className={`fa-solid fa-eye`}
                                                  ></i>
                                                </button>
                                                <button className="bg-warning">
                                                  <i
                                                    className={`fa-solid fa-edit`}
                                                  ></i>
                                                </button>
                                                <button className="bg-danger">
                                                  <i
                                                    className={`fa-solid fa-trash`}
                                                  ></i>
                                                </button>
                                              </div>
                                            </div>
                                          )
                                        )
                                      : null}
                                  </div>

                                  <button
                                    onClick={() =>
                                      handleValueCreateModal(attribute.id)
                                    }
                                    className={"small-button"}
                                  >
                                    <i className={`fa-solid fa-plus`} />
                                  </button>
                                </td>
                                <td>{attribute.status}</td>
                                <td>{attribute.created_by}</td>
                                <td>
                                  <p className={"text-theme"}>
                                    <small>
                                      Created: {attribute.created_at}
                                    </small>
                                  </p>
                                  <p className={"text-success"}>
                                    <small>
                                      Updated: {attribute.updated_at}
                                    </small>
                                  </p>
                                </td>

                                <td>
                                  <button
                                    onClick={() => handleModal(attribute)}
                                    className={
                                      "btn btn-sm btn-warning my-1 mx-1"
                                    }
                                  >
                                    <i className="fa-solid fa-edit"></i>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleAttributeDelete(attribute.id)
                                    }
                                    className={"btn btn-sm btn-danger my-1"}
                                  >
                                    <i className={"fa-solid fa-trash"}></i>
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={7} className={"text-center"}>
                                <NoDataFound text_color={"text-danger"} />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal centered show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modalTitle} Product Attribute
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              placeholder="Enter Attribute Name"
            />
            {errors.name && <ErrorMsg errorMsg={errors.name[0]} />}
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
              placeholder="Enter brand status"
            >
              <option disabled={true} value={""}>
                Select Status
              </option>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
            {errors.status && <ErrorMsg errorMsg={errors.status[0]} />}
          </label>
          <button
            className={"btn theme-button mt-4"}
            onClick={
              isEditMode
                ? () => handleAttributeUpdate(input.id)
                : handleAttributeCreate
            }
          >
            {modalTitle} Attribute
          </button>
        </Modal.Body>
      </Modal>
      <Modal
        centered
        show={valueModalShow}
        onHide={() => setValueModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modalTitle} Attribute Value
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              placeholder="Enter Attribute Name"
            />
            {errors.name && <ErrorMsg errorMsg={errors.name[0]} />}
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
              placeholder="Enter brand status"
            >
              <option disabled={true} value={""}>
                Select Status
              </option>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
            {errors.status && <ErrorMsg errorMsg={errors.status[0]} />}
          </label>
          <button
            className={"btn theme-button mt-4"}
            onClick={handleValueCreate}
          >
            {modalTitle} Value
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductAttributes;
