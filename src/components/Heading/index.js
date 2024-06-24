import React from "react";
import classes from "./index.module.css";

function Heading(props) {
  return <h1 className={classes["heading"]}>{props.title}</h1>;
}

export default Heading;
