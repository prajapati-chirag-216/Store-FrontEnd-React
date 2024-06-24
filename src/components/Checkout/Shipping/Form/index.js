import React, { Fragment, useState } from "react";
import classes from "./index.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "../../../Button";
import { METHOD_OPTIONS } from "../../../../utils/variables";

function Form(props) {
  const [selectedOption, setSelectedOption] = useState(METHOD_OPTIONS.ONLINE);
  const optionChange = (value) => {
    setSelectedOption(value);
  };
  const submitFormHandler = () => {
    const data = { shippingMethod: selectedOption };
    props.onSubmit(data);
  };

  return (
    <Fragment>
      <div className={classes["form"]}>
        <div className={classes["form-group"]}>
          <label
            className={`${classes["form-radio"]} ${
              selectedOption == METHOD_OPTIONS.ONLINE
                ? classes["radio-select"]
                : ""
            }`}
            onClick={optionChange.bind(null, METHOD_OPTIONS.ONLINE)}
          />
          <h1 className={classes["form-label"]}>
            Online Payment : Free Shipping
          </h1>
          <span className={classes["form-price"]}>Free</span>
        </div>
        <hr className={classes["divider"]} />
        <div className={classes["form-group"]}>
          <label
            className={`${classes["form-radio"]} ${
              selectedOption == METHOD_OPTIONS.COD
                ? classes["radio-select"]
                : ""
            }`}
            onClick={optionChange.bind(null, METHOD_OPTIONS.COD)}
          />
          <h1 className={classes["form-label"]}>
            {METHOD_OPTIONS.COD} : COD handling No charges for now, This
            shipping option is eligible for {METHOD_OPTIONS.COD}.
          </h1>
          <span className={classes["form-price"]}>Free</span>
        </div>
      </div>
      <div className={classes["btn-container"]}>
        <div className={classes["back-link"]} onClick={props.onBack}>
          <ChevronLeftIcon sx={{ fontSize: "2.5rem" }} />
          <h1>Back </h1>
        </div>
        <Button
          className="btn-large"
          fontSize="2.2rem"
          width="35rem"
          onClick={submitFormHandler}
        >
          Continue To Shipping
        </Button>
      </div>
    </Fragment>
  );
}

export default Form;
