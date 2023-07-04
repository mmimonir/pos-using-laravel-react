import React from "react";

const Spinner = () => {
  return (
    <button class="btn btn-primary" type="button" disabled>
      <span
        class="spinner-grow spinner-grow-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Login...
    </button>
  );
};

export default Spinner;
