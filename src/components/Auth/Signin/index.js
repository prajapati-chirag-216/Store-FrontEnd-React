import React from "react";
import classes from "./index.module.css";
import Form from "./Form";
function Signin() {
  return (
    <div className={classes["signin-container"]}>
      <div className={classes["form-container"]}>
        <Form />
      </div>
    </div>
  );
}

export default Signin;
