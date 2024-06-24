import React, { Fragment, useEffect, useState } from "react";
import classes from "./index.module.css";
import Button from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import { uiActions } from "../../../store/ui-slice";
import { SNACKBAR_DETAILS } from "../../../utils/variables";

function ProductContent(props) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const [remainingItems, setRemainingItems] = useState([]);

  const addToCartHandler = (item) => {
    dispatch(cartActions.setQtyStatus({ status: true, id: item._id }));
    dispatch(cartActions.setAddItem(item));
    // by using spread operetor "...SNACKBAR_DETAILS" it counts it as new object every time even if same object data is provided
    dispatch(uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_ADD_ITEM }));
  };

  const updateRemainingItems = () => {
    const updatedItems = props.items.map((item) => {
      const cartItem = cartItems.find((cartItem) => cartItem._id === item._id);
      if (cartItem) {
        return {
          ...item,
          quantity: item.quantity - cartItem.quantity,
        };
      }
      return item;
    });
    setRemainingItems(updatedItems);
  };

  useEffect(() => {
    updateRemainingItems();
    const timer = setTimeout(() => {
      dispatch(cartActions.setQtyStatus({ status: false }));
    }, 200);
    return () => clearTimeout(timer);
  }, [cartItems, props.items, dispatch]);

  return (
    <Fragment>
      {remainingItems?.length > 0 ? (
        remainingItems.map((item) => {
          const isNotAvailable = item.status.toLowerCase() == "not-available";
          return (
            <div
              key={item._id}
              className={`${classes["item-container"]} ${
                isNotAvailable || item.quantity <= 0
                  ? classes["item-container--disable"]
                  : ""
              }`}
            >
              {(isNotAvailable || item.quantity <= 0) && (
                <div className={classes["not-avilable"]}>
                  <h1>Not Avilable</h1>
                </div>
              )}

              <div
                className={classes["image-container"]}
                style={{
                  cursor:
                    item.status.toLowerCase() == "available"
                      ? "pointer"
                      : "normal",
                }}
                onClick={
                  item.status.toLowerCase() == "available"
                    ? props.onClick.bind(null, item._id)
                    : () => {}
                }
              >
                <img
                  className={classes["item-img"]}
                  src={item.images[0]}
                  alt="img"
                />
                <h1 className={classes["item-name"]}>{item.name}</h1>
              </div>
              <div className={classes["item-ctrl"]}>
                <span
                  className={`${classes["item-price"]} ${
                    isNotAvailable ? classes["item-price--disable"] : ""
                  }`}
                >
                  {item.price} &#8377;
                </span>
                <Button
                  className="btn-large"
                  color="var(--primary-font-color)"
                  onClick={addToCartHandler.bind(null, item)}
                  disabled={isNotAvailable}
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <p className={"not-found-text"}>No Items Found!!</p>
      )}
    </Fragment>
  );
}

export default ProductContent;
