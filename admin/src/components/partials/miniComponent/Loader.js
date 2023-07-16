import React from "react";
import loader from "./../../../assets/images/loader.svg";

const Loader = () => {
  return (
    <div className={"loader"}>
      <img src={loader} alt="Loading..." />
    </div>
  );
};
export default Loader;
