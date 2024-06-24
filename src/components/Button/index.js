import React from "react";
import classes from "./index.module.css";
function Button(props) {
  return (
    <button
      className={`${classes["btn"]} ${classes[props.className]}`}
      onClick={props.onClick}
      onSubmit={props.onSubmit}
      disabled={props.disabled}
      style={{
        color: props?.color || "curruntcolor",
        marginTop: props.marginTop,
        fontSize: props?.fontSize || "auto",
        width: props?.width || "100%",
      }}
    >
      {props.children}
    </button>
  );
}

export default Button;
