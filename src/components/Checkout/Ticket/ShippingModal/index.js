import React from "react";
import classes from "./index.module.css";

function ShippingModal() {
  return (
    <div className={classes["modal-container"]}>
      <div className={classes["container-content"]}>
        <h1>Delivery Time</h1>
        <h1>- 3 to 5 days in Metro Cities with Airport.</h1>
        <h1>- 5 to 7 Days In 2nd Tier Cities With Airport.</h1>
        <h1>- 10 to 15 days In Rural Area</h1>
      </div>
    </div>
  );
}

export default ShippingModal;
