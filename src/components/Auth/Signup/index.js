import React from "react";
import classes from "./index.module.css";
import Form from "./Form";

function Signup() {
  return (
    <div className={classes["signup-container"]}>
      <div className={classes["form-container"]}>
        <Form />
      </div>
    </div>
  );
}

export default Signup;
