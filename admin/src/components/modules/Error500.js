import React from "react";
import BreadCrumb from "../partials/BreadCrumb";

const Error500 = (props) => {
  return (
    <>
      <BreadCrumb title={"Error 500"} location={props.location} />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-danger">Something is going wrong!</h1>
        </div>
      </div>
    </>
  );
};

export default Error500;
