import React, { useState } from "react";

import ErrorMsg from "../../utils/ErrorMsg";
import Spinner from "../../utils/Spinner";
import Constants from "../../../Constants";
import { axiosInstance } from "../../../AxiosInterceptor";

const Login = () => {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrors([]);
  };
  const handleLogin = () => {
    setIsLoading(true);
    axiosInstance
      .post(`${Constants.BASE_URL}/login`, input)
      .then((res) => {
        // console.log(res.data);
        // localStorage.setItem("token", res.data.token);
        // localStorage.setItem("email", res.data.email);
        // localStorage.setItem("name", res.data.name);
        // localStorage.setItem("photo", res.data.photo);
        // localStorage.setItem("phone", res.data.phone);
        localStorage.setItem("items", JSON.stringify(res.data));
        setIsLoading(false);
        window.location.reload();
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
          // console.log(errors);
        }
      });
  };

  return (
    <div className="container-fluid bg-theme" id={"login"}>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="card bg-theme">
            <div className="card-header">
              <h4 className="card-title">Login</h4>
            </div>
            <div className="card-body">
              <label className={"w-100"}>
                <p>Email/Phone</p>
                <input
                  className={
                    `form-control mt-2` + (errors.email && " is-invalid")
                  }
                  type={"text"}
                  name={"email"}
                  value={input.email}
                  onChange={handleInput}
                />
                {errors.email && <ErrorMsg errorMsg={errors.email[0]} />}
              </label>
              <label className={"w-100 mt-4"}>
                <p>Password</p>
                <input
                  className={
                    `form-control mt-2` + (errors.password && " is-invalid")
                  }
                  type={"password"}
                  name={"password"}
                  value={input.password}
                  onChange={handleInput}
                />
                {errors.email && <ErrorMsg errorMsg={errors.password[0]} />}
              </label>
              <label className={"w-100 mt-4"}>
                <p>Login As</p>
                <select
                  className={
                    `form-select mt-2` + (errors.user_type && " is-invalid")
                  }
                  name={"user_type"}
                  value={input.user_type}
                  onChange={handleInput}
                >
                  <option>Select User Role</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Sales Manager</option>
                </select>
                {errors.user_type && (
                  <ErrorMsg errorMsg={errors.user_type[0]} />
                )}
              </label>
              <div className="d-grid mt-4">
                {isLoading && <Spinner text={"Login"} />}
                {!isLoading && (
                  <button
                    onClick={handleLogin}
                    className="btn btn-primary mt-4"
                    type="button"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
