import React, { useEffect, useReducer, useRef, useState } from "react";
import classes from "./index.module.css";
import Input from "../../../Input";
import Button from "../../../Button";
import {
  nameReducer,
  emailReducer,
  passwordReducer,
} from "../../../../reducers";
import { signupUser } from "../../../../utils/api";
import {
  SNACKBAR_DETAILS,
  STATUS,
  VALIDATION_MESSAGES,
} from "../../../../utils/variables";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../../store/ui-slice";
import { useNavigate } from "react-router-dom";

function Form(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [formIsValid, setFormIsValid] = useState(false);

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const nameChangeHandler = (event) => {
    dispatchName({
      type: "USER_INPUT",
      value: event.target.value.trimStart(),
    });
  };
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
  const validateNameHandler = () => dispatchName({ type: "INPUT_BLUR" });
  const validateEmailHandler = () => dispatchEmail({ type: "INPUT_BLUR" });
  const validatePasswordHandler = () =>
    dispatchPassword({ type: "INPUT_BLUR" });

  const { isValid: nameIsValid } = nameState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(nameIsValid && emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [nameIsValid, emailIsValid, passwordIsValid]);

  const validateFormHandler = async (event) => {
    event.preventDefault();
    if (!passwordIsValid) {
      passwordRef.current.focus();
    }
    if (!emailIsValid) {
      emailRef.current.focus();
    }
    if (!nameIsValid) {
      nameRef.current.focus();
    }
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const userData = {
      name: nameState.value,
      email: emailState.value,
      password: passwordState.value,
    };
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.LOAD }));
    try {
      await signupUser(userData);
      navigate("/home");
      dispatch(uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_SIGNED_UP }));
      dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
    } catch (err) {
      dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
      if (
        err.response?.data?.message.toLowerCase().includes("11000") ||
        err.response?.data?.message.toLowerCase().includes("duplicate key")
      ) {
        emailRef.current.focus();
        dispatch(
          uiActions.setSnackBar({
            ...SNACKBAR_DETAILS.ON_DUPLICATE_CREDENTIALS,
          })
        );
      }
    }
  };

  return (
    <form
      className={classes["form"]}
      onSubmit={formIsValid ? submitFormHandler : validateFormHandler}
      method="post"
    >
      {nameIsValid == false && (
        <span className={classes["invalid-txt"]}>
          {VALIDATION_MESSAGES.NAME}
        </span>
      )}
      <Input
        ref={nameRef}
        type="text"
        placeholder="Name"
        onChange={nameChangeHandler}
        onBlur={validateNameHandler}
        name="name"
        value={nameState.value}
        isValid={nameIsValid}
      />
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
        SignUp
      </Button>
    </form>
  );
}

export default Form;
