import React, { useEffect, useState } from "react";
import classes from "./index.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../utils/api";
import { uiActions } from "../../../store/ui-slice";
import { STATUS } from "../../../utils/variables";

function Navigation(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [activatedLink, setActivatedLink] = useState(
    pathname === "/contact" ? 2 : pathname === "/about" ? 1 : 0
  );
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const qtyStatus = useSelector((state) => state.cart.qtyStatus);
  const [userProfile, setUserProfile] = useState(null);

  const changeQuantityHandler = (items) => {
    let totalQty = 0;
    items.forEach((item) => (totalQty += item.quantity));
    setTotalQuantity(totalQty);
  };

  const fetchUserProfileHandler = async () => {
    const userData = await fetchUserProfile();
    return userData;
  };

  const navigateHandler = () => {
    if (userProfile) {
      if (pathname !== "/myProfile") {
        dispatch(uiActions.setIsLoadingBar({ status: STATUS.LOAD }));
        navigate("/myProfile");
      }
    } else {
      dispatch(uiActions.setIsLoadingBar({ status: STATUS.LOAD }));
      navigate("/auth");
    }
  };

  useEffect(() => {
    changeQuantityHandler(cartItems);
  }, [cartItems]);

  useEffect(() => {
    fetchUserProfileHandler()
      .then((data) => {
        if (data) {
          setUserProfile(data);
        }
      })
      .catch((err) => {});
  }, []);

  const openCartHandler = () => props.onOpen();

  const activateLinkHandler = (index) => setActivatedLink(index);

  const deActivateLinkHandler = () => {
    if (pathname === "/contact") {
      setActivatedLink(1);
    } else {
      setActivatedLink(0);
    }
  };

  return (
    <div className={classes["nav-container"]}>
      <div className={classes["container-links"]}>
        <motion.div
          className={classes["active-link"]}
          style={{
            left:
              activatedLink === 0
                ? "0"
                : activatedLink === 1
                ? "16rem"
                : "32rem",
          }}
        />
        <NavLink
          to="/home"
          className={classes["nav-link"]}
          onMouseOver={activateLinkHandler.bind(null, 0)}
          onMouseLeave={deActivateLinkHandler}
        >
          Home
        </NavLink>
        <NavLink
          to="/contact"
          className={classes["nav-link"]}
          onMouseOver={activateLinkHandler.bind(null, 1)}
          onMouseLeave={deActivateLinkHandler}
        >
          Contact
        </NavLink>
      </div>

      <div className={classes["container-btns"]}>
        <div className={classes["btn-icon"]} onClick={navigateHandler}>
          <AccountCircleIcon
            sx={{ fontSize: "4rem", color: "var(--color-white)" }}
          />
          <span className={classes["user-name"]}>
            {userProfile
              ? `Hello ${userProfile.name.split(" ")[0]}`
              : "Signup/login"}
          </span>
        </div>
      </div>
      <div
        className={`${classes["btn-icon"]} ${classes["icon-float"]} ${
          qtyStatus.status ? classes["bump"] : ""
        }`}
        onClick={openCartHandler}
      >
        <span className={classes["total-qty"]}>{totalQuantity}</span>
        {totalQuantity == 0 ? (
          <ShoppingCartOutlinedIcon
            sx={{
              fontSize: "4rem",
              color: "var(--color-white)",
              marginTop: "1.8rem",
            }}
          />
        ) : (
          <ShoppingCartIcon
            sx={{
              fontSize: "4rem",
              color: "var(--color-white)",
              marginTop: "1.8rem",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Navigation;
