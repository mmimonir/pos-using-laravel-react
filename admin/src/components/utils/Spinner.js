import React from "react";

const Spinner = (props) => {
  return (
    <button class="btn btn-primary" type="button" disabled>
      <span
        class="spinner-grow spinner-grow-sm"
        role="status"
        aria-hidden="true"
      ></span>
      {props.text}...
    </button>
  );
};

export default Spinner;
