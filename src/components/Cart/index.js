import React, { Fragment, useEffect } from "react";
import classes from "./index.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { useNavigate } from "react-router-dom";

function Cart(props) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const qtyStatus = useSelector((state) => state.cart.qtyStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increseQtyHandler = (id) => {
    dispatch(cartActions.setQtyStatus({ status: true, id }));
    dispatch(cartActions.setIncreaseQty(id));
  };

  const descreseQtyHandler = (id) => {
    dispatch(cartActions.setQtyStatus({ status: true, id }));
    dispatch(cartActions.setDecreaseQty(id));
  };

  const removeItemHandler = (id) => {
    dispatch(cartActions.setQtyStatus({ status: true, id }));
    dispatch(cartActions.setRemoveItem(id));
  };

  const navigateHandler = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    let timer;
    if (qtyStatus.status) {
      setTimeout(() => {
        dispatch(cartActions.setQtyStatus({ status: false }));
      }, 200);
    }

    return () => clearTimeout(timer);
  }, [qtyStatus]);

  const closeCartHandler = () => props.onClose();

  return (
    <div
      className={classes["cart-container"]}
      style={{ right: props.isOpen ? "0" : "-70rem" }}
    >
      <div className={classes["container-heading"]}>
        <h1>Cart</h1>
        <span onClick={closeCartHandler} className={classes["close-btn"]}>
          &#x2715;
        </span>
      </div>
      <div className={classes["container-items"]}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className={classes["container-item"]} key={item._id}>
              <div className={classes["item-img"]}>
                <img src={item.images[0]} />
              </div>
              <div className={classes["item-details"]}>
                <h2 className={classes["item-name"]}>{item.name}</h2>
                <p className={classes["item-description"]}>
                  {item.description.slice(0, 70)}..
                </p>
                <div className={classes["qty-controller"]}>
                  <RemoveIcon
                    sx={{ fontSize: "3rem", cursor: "pointer" }}
                    onClick={descreseQtyHandler.bind(null, item._id)}
                  />
                  <h1 className={classes["qty-text"]}>{item.quantity}</h1>
                  <AddIcon
                    sx={{ fontSize: "3rem", cursor: "pointer" }}
                    onClick={increseQtyHandler.bind(null, item._id)}
                  />
                </div>
                <div className={classes["item-controller"]}>
                  <h2 className={classes["item-price"]}>{item.price}</h2>
                  <h2
                    className={classes["item-btn"]}
                    onClick={removeItemHandler.bind(null, item._id)}
                  >
                    Remove
                  </h2>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Fragment>
            <HourglassEmptyIcon
              sx={{
                fontSize: "8rem",
                color: "var(--tertiary-font-color)",
                marginTop: "50%",
                alignSelf: "center",
              }}
            />
            <h1 className={classes["empty-text"]}>Empty!</h1>
          </Fragment>
        )}
      </div>
      <Button
        className="btn-large"
        disabled={cartItems.length <= 0}
        onClick={navigateHandler}
      >
        Checkout
      </Button>
    </div>
  );
}

export default Cart;
