import React, { useState } from "react";
import classes from "./index.module.css";
import HistoryIcon from "@mui/icons-material/History";
import { useNavigate } from "react-router-dom";

const PROFILE_MENUS = [{ label: "Order History", icon: <HistoryIcon /> }];

function Slider() {
  const navigate = useNavigate();

  // if we have multiple menus setActiveMenu will be used in future
  const [activeMenu, setActiveMenu] = useState(0);
  const navigateHandler = () => {
    navigate("/myProfile");
  };
  return (
    <div className={classes["slider-container"]}>
      {PROFILE_MENUS.map((menu, index) => (
        <div
          key={index}
          className={`${classes["container-menu"]} ${
            activeMenu == index ? classes["container-menu--active"] : ""
          }`}
          onClick={navigateHandler}
        >
          {menu.icon}
          <span className={classes["menu-label"]}>{menu.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Slider;
