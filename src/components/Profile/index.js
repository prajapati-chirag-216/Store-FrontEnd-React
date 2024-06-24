import React, { useEffect } from "react";
import classes from "./index.module.css";
import Slider from "./Slider";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { STATUS } from "../../utils/variables";

function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
  }, []);

  return (
    <div className={classes["profile-container"]}>
      <div className={classes["container-left"]}>
        <Slider />
      </div>
      <div className={classes["container-right"]}>
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
