import React, { useEffect, useState } from "react";
import classes from "./index.module.css";
import Stepper from "./Stepper";
import Ticket from "./Ticket";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../store/order-slice";
import {
  METHOD_OPTIONS,
  SNACKBAR_DETAILS,
  STATUS,
  STEP_LABELS_CHECKOUT,
} from "../../utils/variables";
import { postOrder } from "../../utils/api";
import { cartActions } from "../../store/cart-slice";
import { uiActions } from "../../store/ui-slice";
import CheckIcon from "@mui/icons-material/Check";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const orderInfo = useSelector((state) => state.order.orderInfo);
  const location = useLocation();
  const navigate = useNavigate();

  const [stepValue, setStepValue] = useState(1);

  const changeStepHandler = (step) => {
    let location;
    if (step == 1) {
      location = "/checkout";
    } else if (step == 2) {
      location = "/checkout/shipping";
    } else if (
      step == 3 &&
      orderInfo?.shippingMethod == METHOD_OPTIONS.ONLINE
    ) {
      // from here we will invoke payment gateway
      // location = "/checkout/payment";
    }
    navigate(location, { replace: true });
    setStepValue(step);
  };

  const saveDataHandler = async (step, data) => {
    if (step == 2) {
      dispatch(orderActions.setOrderInfo(data));
    } else if (step == 3) {
      const shippingMethod = data;
      let totalPrice = 0;
      let orderedItems = cartItems.map((item) => {
        totalPrice += item.quantity * item.price;
        return {
          productId: item._id,
          quantity: item.quantity,
        };
      });
      const orderDetails = {
        ...orderInfo,
        ...shippingMethod,
        orderedItems,
        totalPrice,
      };
      dispatch(uiActions.setIsLoadingBar({ status: STATUS.LOAD }));
      try {
        await postOrder(orderDetails);
        dispatch(
          uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_ORDER_PLACED })
        );
        dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
      } catch (err) {
        if (err?.response?.status == 404) {
          dispatch(
            uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_NOT_AVAILABLE })
          );
        } else {
          dispatch(
            uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_ORDER_CANCLED })
          );
        }
        dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
      }
      dispatch(cartActions.clearCart());
      navigate("/home", { replace: true });
      dispatch(orderActions.clearOrderInfo());
      // for now here we made api request
    }
  };

  useEffect(() => {
    if (location.pathname.endsWith("/checkout")) {
      setStepValue(1);
    } else if (location.pathname.endsWith("/shipping")) {
      setStepValue(2);
    } else if (location.pathname.endsWith("/payment")) {
      setStepValue(3);
    }
    return () => {
      dispatch(orderActions.clearOrderInfo());
    };
  }, []);

  useEffect(() => {
    if (
      (!orderInfo?.contactInformation || !orderInfo?.shippingAddress) &&
      stepValue > 1
    ) {
      navigate("/checkout");
      setStepValue(1);
    } else if (!orderInfo?.shippingMethod && stepValue > 2) {
      navigate("/checkout/shipping");
      setStepValue(2);
    }
  }, [stepValue]);

  return (
    <div className={classes["checkout-container"]}>
      <div className={classes["container-left"]}>
        <div className={classes["container-stepper"]}>
          <Stepper
            stepValue={stepValue}
            stepLabels={STEP_LABELS_CHECKOUT}
            successIcon={
              <CheckIcon
                sx={{ fontSize: "2.5rem", color: "var(--color-white)" }}
              />
            }
          />
        </div>
        <div className={classes["container-details"]}>
          <Outlet
            context={{
              onStepChange: changeStepHandler,
              onContinue: saveDataHandler,
            }}
          />
        </div>
      </div>
      <div className={classes["container-right"]}>
        <div className={classes["container-ticket"]}>
          <Ticket />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
