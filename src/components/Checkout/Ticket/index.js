import React, { useEffect, useState } from "react";
import classes from "./index.module.css";
import HelpIcon from "@mui/icons-material/Help";
import Modal from "../../UI/Modal";
import { useSelector } from "react-redux";
import ShippingModal from "./ShippingModal";

function Ticket() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [showModal, setShowModal] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setSubTotal(totalPrice);
  }, []);

  const openModalHandler = () => {
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className={classes["ticket-container"]}>
      <Modal
        isOpen={showModal}
        onClose={closeModalHandler}
        text="Shipping policy"
      >
        <ShippingModal />
      </Modal>
      <h1 className={classes["container-heading"]}>Cart</h1>
      <div className={classes["cart-container"]}>
        {cartItems.map((item) => {
          return (
            <div key={item._id} className={classes["item-container"]}>
              <div className={classes["item_img-container"]}>
                <span className={classes["quantity-badge"]}>
                  {item.quantity}
                </span>
                <img src={item.images[0]} />
              </div>
              <div className={classes["item_details-container"]}>
                <h1 className={classes["item-name"]}>{item.name}</h1>
                <p className={classes["item-description"]}>
                  {item.description.slice(0, 100)}..
                </p>
                <h2 className={classes["item-price"]}> &#8377; {item.price}</h2>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes["price-container"]}>
        <div className={classes["row-container"]}>
          <h1>Subtotal</h1>
          <h1>&#8377; {subTotal.toFixed(2)}</h1>
        </div>
        <div className={classes["row-container"]}>
          <h1 className={classes["shipping-text"]}>
            Shipping
            <HelpIcon
              sx={{
                fontSize: "var(--medium-font-size)",
                cursor: "pointer",
                color: "gray",
                "&:hover": {
                  color: "rgb(80,80,80)",
                },
              }}
              onClick={openModalHandler}
            />
          </h1>
          <h1>Free</h1>
        </div>
      </div>
      <div className={classes["total-container"]}>
        <h1>Total</h1>
        <h2>&#8377; {subTotal.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default Ticket;
