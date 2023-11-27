import React from "react";
import { Link } from "react-router-dom";

const CardHeader = (props) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h3 className={"text-theme"}>{props.title}</h3>
      {props.hide == undefined ? (
        <Link to={props.link}>
          <button className={"btn theme-button"}>
            <i className={`fa-solid ${props.icon}`}></i> {props.button_text}
          </button>
        </Link>
      ) : null}
    </div>
  );
};

export default CardHeader;
