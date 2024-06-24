import React, { useEffect, useState } from "react";
import classes from "./index.module.css";
import Button from "../../../Button";
import VerifiedIcon from "@mui/icons-material/Verified";
import moment from "moment";

function OrderContent(props) {
  const [totalQuantity, setTotalQuantity] = useState([]);

  useEffect(() => {
    const quantity = props.orderData.map((order) =>
      order.orderedItems.reduce(
        (totalQuantity, item) => totalQuantity + item.quantity,
        0
      )
    );
    setTotalQuantity(quantity);
  }, []);

  return props.orderData.map((order, index) => (
    <div className={classes["order-container"]} key={order._id}>
      {order.deliveryStatus.toLowerCase() === "delivered" && (
        <VerifiedIcon
          sx={{
            position: "absolute",
            color: "green",
            fontSize: "2.5rem",
            top: "1.5rem",
            right: "1.5rem",
          }}
        />
      )}
      <h1 className={classes["container-heading--primary"]}>
        Order #{index + 1}
      </h1>
      <h1 className={classes["container-heading--secondary"]}>
        {moment(order.createdAt).format("D MMM YYYY, h:mm A")}
      </h1>
      <div className={classes["container-content"]}>
        {order.orderedItems.map((orderDetails) => (
          <div
            key={orderDetails.productId._id}
            className={classes["item-container"]}
          >
            <div className={classes["item_img-container"]}>
              <img src={orderDetails.productId.images[0]} />
            </div>
            <div className={classes["item_details-container"]}>
              <h1 className={classes["item-name"]}>
                {orderDetails.productId.name}
              </h1>
              <p className={classes["item-description"]}>
                {orderDetails.productId.description.slice(0, 70)}..
              </p>
              <div className={classes["item-ctrl"]}>
                <h2 className={classes["item-price"]}>
                  &#8377; {orderDetails.productId.price}
                </h2>
                <h2 className={classes["item-qty"]}>
                  Qty : {orderDetails.quantity}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={classes["order-ctrl"]}>
        <div>
          <h1 className={classes["order-qty"]}>{totalQuantity[index]} Items</h1>
          <h2 className={classes["order-total"]}>&#8377; {order.totalPrice}</h2>
        </div>
        <Button
          width="18rem"
          className="btn-small"
          fontSize="1.8rem"
          onClick={props.onClick.bind(null, order._id)}
        >
          View Status
        </Button>
      </div>
    </div>
  ));
}

export default OrderContent;
