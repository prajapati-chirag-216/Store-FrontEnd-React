import React, { useState } from "react";
import classes from "./index.module.css";
import Button from "../../Button";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart-slice";

function Header({ productDetails }) {
  const dispatch = useDispatch();

  const [displayImage, setDisplayImage] = useState(productDetails.images[0]);
  const displayChangeHandler = (img) => {
    setDisplayImage(img);
  };
  const addItemHandler = () => {
    const productData = {
      _id: productDetails._id,
      name: productDetails.name,
      description: productDetails.description,
      status: productDetails.status,
      images: productDetails.images,
      quantity: productDetails.quantity,
      price: productDetails.price,
    };
    dispatch(cartActions.setAddItem(productData));
  };

  return (
    <div className={classes["product-container"]} id="product-container">
      <div className={classes["container-display"]}>
        <div className={classes["display-slider"]}>
          {productDetails &&
            productDetails.images.map((image, index) => {
              return (
                <div
                  className={classes["slider-image"]}
                  key={index}
                  onClick={displayChangeHandler.bind(null, image)}
                >
                  <img src={image} />
                </div>
              );
            })}
        </div>
        <div className={classes["display-image"]}>
          {displayImage && <img src={displayImage} />}
        </div>
      </div>
      <div className={classes["details-container"]}>
        <div className={classes["row-items"]}>
          <h1 className={classes["item-name"]}>{productDetails.name}</h1>
          <span className={classes["item-price"]}>
            {productDetails.price} &#8377;
          </span>
        </div>

        <Button className="btn-large" marginTop="2rem" onClick={addItemHandler}>
          Add to cart
        </Button>
        <div className={classes["description-container"]}>
          <label className={classes["description-label"]}>Description</label>
          <h2 className={classes["item-description"]}>
            {productDetails.description} In the ancient city of Arcadia, where
            the line between myth and reality blurs, a forgotten prophecy
            emerges, foretelling a cataclysmic event that will shake the
            foundations of the world. In the heart of this enigmatic realm, lies
            a tale woven through time, bound by destiny and the fragile threads
            of human resilience. In the ancient city of Arcadia, where the line
            between myth and reality blurs, a forgotten prophecy emerges,
            foretelling a cataclysmic event that will shake the foundations of
            the world. In the heart of this enigmatic realm, lies a tale woven
            through time, bound by destiny and the fragile threads of human
            resilience. In the ancient city of Arcadia, where the line between
            myth and reality blurs, a forgotten prophecy emerges, foretelling a
            cataclysmic event that will shake the foundations of the world. In
            the heart of this enigmatic realm, lies a tale woven through time,
            bound by destiny and the fragile threads of human resilience. In the
            ancient city of Arcadia, where the line
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Header;
