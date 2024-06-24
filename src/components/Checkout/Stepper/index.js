import React from "react";
import classes from "./index.module.css";

function Stepper(props) {
  return (
    <div
      className={`${classes["stepper-container"]} ${
        props.large ? classes["stepper-container--large"] : ""
      }`}
    >
      <hr
        className={classes["stepper-line"]}
        style={{
          backgroundImage:
            props.stepValue > 1
              ? `linear-gradient(to right, var(--color-black) ${
                  50 * (props.stepValue - 1)
                }%, #ccc ${100 - 50 * (props.stepValue - 1)}%)`
              : "",
        }}
      />
      {props?.stepLabels.map((label, index) => (
        <div
          key={index}
          className={`${classes["container-content"]} ${
            props.large ? classes["container-content--large"] : ""
          }`}
        >
          <div
            className={`${classes["container-bubble"]} ${
              props.large ? classes["container-bubble--large"] : ""
            } ${props.stepValue == index + 1 ? classes["bubble-active"] : ""} ${
              props.stepValue > index ? classes["bubble-complete"] : ""
            }`}
          >
            {props.successIcon.length > 0
              ? props.successIcon[index]
              : props.stepValue > index + 1
              ? props.successIcon
              : index + 1}
          </div>
          <h1
            className={`${classes["container-label"]} ${
              props.stepValue > index ? classes["label-active"] : ""
            }`}
          >
            {label}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default Stepper;
