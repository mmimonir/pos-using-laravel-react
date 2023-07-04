import React from "react";

const ErrorMsg = (props) => {
  return (
    <>
      <p className="login-error-msg">
        <small>{props.errorMsg}</small>
      </p>
    </>
  );
};

export default ErrorMsg;
