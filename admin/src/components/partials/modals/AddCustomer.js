import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import Swal from "sweetalert2";

const AddCustomer = (props) => {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCustomerCreate = () => {
    setIsLoading(true);
    axiosInstance
      .post(`${Constants.BASE_URL}/customer`, input)
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
        props.onHide();
        setInput({});
      })
      .catch((errors) => {
        console.log(errors);
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title className="ms-auto" id="contained-modal-title-vcenter">
          Add Customer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className={"w-100"}>
          <p>Name</p>
          <input
            className={
              errors?.name != undefined
                ? "form-control mt-2 is-invalid"
                : "form-control mt-2"
            }
            type={"text"}
            name={"name"}
            value={input.name}
            onChange={handleInput}
            placeholder={"Enter Customer Name"}
          />
          <p className={"login-error-msg"}>
            <small>{errors?.name != undefined ? errors?.name[0] : null}</small>
          </p>
        </label>
        <label className={"w-100 mt-4"}>
          <p>Phone</p>
          <input
            className={
              errors?.phone != undefined
                ? "form-control mt-2 is-invalid"
                : "form-control mt-2"
            }
            type={"text"}
            name={"phone"}
            value={input.phone}
            onChange={handleInput}
            placeholder={"Enter Product name"}
          />
          <p className={"login-error-msg"}>
            <small>
              {errors?.phone != undefined ? errors?.phone[0] : null}
            </small>
          </p>
        </label>
        <label className={"w-100 mt-4"}>
          <p>Email</p>
          <input
            className={
              errors?.email != undefined
                ? "form-control mt-2 is-invalid"
                : "form-control mt-2"
            }
            type={"email"}
            name={"email"}
            value={input.email}
            onChange={handleInput}
            placeholder={"Enter Product name"}
          />
          <p className={"login-error-msg"}>
            <small>
              {errors?.email != undefined ? errors?.email[0] : null}
            </small>
          </p>
        </label>
        <button
          className={"btn theme-button mt-4 w-100"}
          onClick={handleCustomerCreate}
          dangerouslySetInnerHTML={{
            __html: isLoading
              ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...'
              : "Add Customer",
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddCustomer;
