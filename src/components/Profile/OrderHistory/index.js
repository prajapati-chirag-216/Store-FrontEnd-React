import React, { useEffect, useState } from "react";
import classes from "./index.module.css";
import Grid from "../../Grid";
import OrderContent from "./OrderContent";
import { getUserOrders, logoutUser, addCartItems } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import { SNACKBAR_DETAILS, STATUS } from "../../../utils/variables";
import { cartActions } from "../../../store/cart-slice";
import LoadingSpinner from "../../UI/LoadingSpinner";

function OrderHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const fetchOrderDataHandler = async () => {
    const data = await getUserOrders();
    return data;
  };

  const logoutHandler = async () => {
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.LOAD }));
    try {
      await addCartItems(cartItems);
      await logoutUser();
    } catch (err) {
      dispatch(uiActions.setSnackBar(SNACKBAR_DETAILS.ON_ERROR));
    }
    dispatch(uiActions.setSnackBar(SNACKBAR_DETAILS.ON_LOGGED_OUT));
    dispatch(cartActions.clearCart());
    setIsLoading(false);
    navigate("/auth", { replace: true });
  };

  const navigateHandler = (id) => {
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.LOAD }));
    navigate("orderStatus/" + id);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchOrderDataHandler().then((data) => {
      if (data) {
        setOrderData(data);
      }
      setIsLoading(false);
    });
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
  }, []);

  return (
    <div className={classes["order-container"]}>
      <div>
        <div className={classes["container-heading"]}>
          <h1 className={classes["container-heading--primary"]}>order List</h1>
          <Button className="btn-small" width="18rem" onClick={logoutHandler}>
            Logout
          </Button>
        </div>
        <h2 className={classes["container-heading--secondary"]}>
          stay updated with your orders track your status
        </h2>
      </div>
      <div className={classes["container-main"]}>
        {isLoading ? (
          <LoadingSpinner />
        ) : orderData.length == 0 ? (
          <h1 className={classes["empty-text"]}>No orders Yet!</h1>
        ) : (
          <Grid small marginTop="0">
            {orderData.length > 0 && (
              <OrderContent orderData={orderData} onClick={navigateHandler} />
            )}
          </Grid>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
