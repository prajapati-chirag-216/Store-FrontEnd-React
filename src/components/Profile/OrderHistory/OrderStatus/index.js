import React, { Fragment, useEffect, useState } from "react";
import classes from "./index.module.css";
import Stepper from "../../../Checkout/Stepper";
import {
  METHOD_OPTIONS,
  STATUS,
  STEP_LABELS_ORDER_STATUS,
} from "../../../../utils/variables";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import { getOrderById } from "../../../../utils/api";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../../store/ui-slice";

const defaultStyle = { fontSize: "2.5rem", color: "var(--color-white)" };
const ICONS = [
  <PendingActionsIcon sx={{ ...defaultStyle }} />,
  <LocalShippingIcon sx={{ ...defaultStyle }} />,
  <DoorBackIcon sx={{ ...defaultStyle }} />,
];

function OrderStatus(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathName = location.pathname;
  const id = pathName.split("/")[3];

  const [orderData, setOrderData] = useState(null);

  const fetchOrderHandler = async (id) => {
    const data = await getOrderById(id);
    return data;
  };
  useEffect(() => {
    fetchOrderHandler(id).then((data) => {
      data.totalQuantity = data.orderedItems.reduce(
        (totalQuantity, item) => totalQuantity + item.quantity,
        0
      );
      data.deliveryStatus =
        data.deliveryStatus.toLowerCase() == "pending"
          ? 1
          : data.deliveryStatus.toLowerCase() == "shipped"
          ? 2
          : 3;
      setOrderData(data);
      dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
    });
  }, []);

  return (
    <div className={classes["status-container"]}>
      <h1 className={classes["heading-text"]}>Your Order Status</h1>
      {orderData && (
        <Fragment>
          <h1 className={classes["container-stemp"]}>
            {moment(orderData.createdAt).format("D MMM YYYY, h:mm A")}
          </h1>
          <Stepper
            stepValue={orderData.deliveryStatus}
            stepLabels={STEP_LABELS_ORDER_STATUS}
            successIcon={ICONS}
            large
          />

          <div className={classes["status-content"]}>
            <div className={classes["content-left"]}>
              <div className={classes["container-content"]}>
                {orderData.orderedItems.map((orderDetails) => (
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
                        {orderDetails.productId.description.slice(0, 100)}..
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
            </div>

            <div className={classes["content-right"]}>
              <div className={classes["shipping-address"]}>
                <h1 className={classes["block-heading"]}>Shipping Address</h1>
                <p>{orderData.shippingAddress.userName}</p>
                <p>
                  {orderData.shippingAddress.address},{" "}
                  {orderData.shippingAddress.city},{" "}
                  {orderData.shippingAddress.state},{" "}
                  {orderData.shippingAddress.country}{" "}
                  {orderData.shippingAddress.pinCode}
                </p>
              </div>
              <div className={classes["order-summary"]}>
                <h1 className={classes["block-heading"]}>Order Summary</h1>
                <div className={classes["summary-info"]}>
                  <h1>Total Items</h1>
                  <h1>{orderData.totalQuantity}</h1>
                </div>
                <div className={classes["summary-info"]}>
                  <h1>Delivary Charges</h1>
                  <h1>
                    {orderData.shippingMethod == METHOD_OPTIONS.ONLINE ? (
                      "Free"
                    ) : (
                      <span>&#8377; 49 </span>
                    )}
                  </h1>
                </div>
                <div className={classes["summary-info"]}>
                  <h1>SubTotal</h1>
                  <h1>&#8377; {orderData.totalPrice}</h1>
                </div>
                <div className={classes["summary-info"]}>
                  <h1>Payment Method</h1>
                  <h1>{orderData.shippingMethod}</h1>
                </div>
                <div className={classes["summary-total"]}>
                  <h1>Grand Total</h1>
                  <h1>
                    &#8377;{" "}
                    {orderData.shippingMethod == METHOD_OPTIONS.ONLINE
                      ? orderData.totalPrice
                      : orderData.totalPrice + 49}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default OrderStatus;
