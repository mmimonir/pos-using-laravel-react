import React from "react";
import { Link } from "react-router-dom";

const CardHeader = (props) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h3 className={"text-theme"}>{props.title}</h3>
      <button className={"btn theme-button"}>
        <Link to={props.link}>
          <i className={`fa-solid ${props.icon}`}></i> {props.button_text}
        </Link>
      </button>
    </div>
  );
};

export default CardHeader;
