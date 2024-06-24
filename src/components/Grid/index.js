import React from "react";
import classes from "./index.module.css";

function Grid(props) {
  return (
    <div
      className={`${classes["grid"]} ${
        props.small ? classes["grid-small"] : ""
      }`}
      style={{
        marginTop: props?.marginTop ? props.marginTop : "20rem",
      }}
    >
      {props.children}
    </div>
  );
}

export default Grid;
