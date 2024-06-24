import React, { Fragment, useEffect, useState } from "react";
import classes from "./index.module.css";
import Signin from "../../components/Auth/Signin";
import Signup from "../../components/Auth/Signup";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { STATUS } from "../../utils/variables";
import { uiActions } from "../../store/ui-slice";

function Auth() {
  const dispatch = useDispatch();
  const [authPage, setAuthPage] = useState("signup");
  const [matchesMediaQuery, setMatchesMediaQuery] = useState(
    window.matchMedia("(max-width: 1000px)").matches
  );

  const authChangeHandler = () => {
    setAuthPage((prevState) => (prevState === "signup" ? "signin" : "signup"));
  };

  useEffect(() => {
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
  }, [dispatch]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");

    const handleMediaQueryChange = (e) => {
      setMatchesMediaQuery(e.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);

    // Cleanup function
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  return (
    <div className={classes["auth-container"]}>
      <motion.div
        className={classes["overlay"]}
        style={{
          left: matchesMediaQuery ? "0" : authPage === "signup" ? "50%" : "0",
          bottom: matchesMediaQuery
            ? authPage === "signup"
              ? "50%"
              : "0"
            : "auto",
        }}
      >
        <div className={classes["overlay-text"]}>
          <h2>
            {authPage === "signup" ? "Already" : "Don't"} have an Account?{" "}
          </h2>
          <h2 onClick={authChangeHandler} className={classes["overlay-link"]}>
            {authPage === "signup" ? "Signin" : "Signup"}
          </h2>
        </div>
      </motion.div>
      {matchesMediaQuery ? (
        <Fragment>
          <div className={classes["option-text"]}>
            <h2>
              {authPage === "signup" ? "Already" : "Don't"} have an Account?{" "}
            </h2>
            <h2 onClick={authChangeHandler} className={classes["overlay-link"]}>
              {authPage === "signup" ? "Signin" : "Signup"}
            </h2>
          </div>
          {authPage === "signup" ? <Signup /> : <Signin />}
        </Fragment>
      ) : (
        <Fragment>
          <Signup />
          <Signin />
        </Fragment>
      )}
    </div>
  );
}

export default Auth;
