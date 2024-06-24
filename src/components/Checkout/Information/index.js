import React from "react";
import classes from "./index.module.css";
import Form from "./Form";
import { useNavigate, useOutletContext } from "react-router-dom";

function Information() {
  const navigate = useNavigate();
  const props = useOutletContext();

  const navigateHandler = () => {
    props.onStepChange(0);
    navigate("/home", { replace: true });
  };
  const nextStepHandler = (data) => {
    props.onStepChange(2);
    props.onContinue(2, data);
  };

  return (
    <div className={classes["info-container"]}>
      <Form onBack={navigateHandler} onSubmit={nextStepHandler} />
    </div>
  );
}

export default Information;
