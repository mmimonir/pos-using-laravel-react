import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [input, setInput] = useState({});
  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLogin = () => {
    axios.post("http://localhost:8001/api/login", input).then((res) => {
      console.log(res.data);
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
                  className="form-control mt-2"
                  type={"text"}
                  name={"email"}
                  value={input.email}
                  onChange={handleInput}
                />
              </label>
              <label className={"w-100 mt-4"}>
                <p>Password</p>
                <input
                  className="form-control mt-2"
                  type={"password"}
                  name={"password"}
                  value={input.password}
                  onChange={handleInput}
                />
              </label>
              <div className="d-grid mt-4">
                <button
                  onClick={handleLogin}
                  className="btn btn-primary mt-4"
                  type="button"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
