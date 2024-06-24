import React, { useEffect, useReducer, useRef, useState } from "react";
import classes from "./index.module.css";
import Input from "../../../Input";
import Button from "../../../Button";
import { emailReducer, passwordReducer } from "../../../../reducers";
import { loginUser } from "../../../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../../store/ui-slice";
import {
  SNACKBAR_DETAILS,
  STATUS,
  VALIDATION_MESSAGES,
} from "../../../../utils/variables";
import { cartActions } from "../../../../store/cart-slice";

function Form() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "USER_INPUT",
      value: event.target.value,
    });
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT",
      value: event.target.value,
    });
  };

  // this will run on input gets out from focus
  const validateEmailHandler = () => dispatchEmail({ type: "INPUT_BLUR" });
  const validatePasswordHandler = () =>
    dispatchPassword({ type: "INPUT_BLUR" });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid]);

  const validateFormHandler = async (event) => {
    event.preventDefault();
    if (!passwordIsValid) {
      passwordRef.current.focus();
    }
    if (!emailIsValid) {
      emailRef.current.focus();
    }
  };
  const dispatch = useDispatch();

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const userData = {
      email: emailState.value,
      password: passwordState.value,
    };
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.LOAD }));
    try {
      const { cartItems } = await loginUser(userData);
      navigate("/home");
      dispatch(uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_LOGGED_IN }));
      dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
      dispatch(cartActions.setLoadItemsToCart(cartItems));
    } catch (err) {
      dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
      if (err.response?.data?.message.toLowerCase().includes("password")) {
        passwordRef.current.focus();
      } else {
        emailRef.current.focus();
      }
    }
  };

  return (
    <form
      className={classes["form"]}
      onSubmit={formIsValid ? submitFormHandler : validateFormHandler}
      method="post"
    >
      {emailIsValid == false && (
        <span className={classes["invalid-txt"]}>
          {VALIDATION_MESSAGES.EMAIL}
        </span>
      )}
      <Input
        ref={emailRef}
        type="text"
        placeholder="Email"
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        name="email"
        value={emailState.value}
        isValid={emailIsValid}
      />

      {passwordIsValid == false && (
        <span className={classes["invalid-txt"]}>
          {VALIDATION_MESSAGES.PASSWORD}
        </span>
      )}
      <Input
        ref={passwordRef}
        type="password"
        maxLength={10}
        placeholder="Password"
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        name="password"
        value={passwordState.value}
        isValid={passwordIsValid}
      />
      <Button className="btn-small" marginTop="2rem">
        Sign in
      </Button>
    </form>
  );
}

export default Form;
