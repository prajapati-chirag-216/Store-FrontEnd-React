import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { getProduct } from "../../utils/api";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { STATUS } from "../../utils/variables";

function ProductDetails() {
  const location = useLocation();
  const pathName = location.pathname;
  const productId = pathName.split("/")[2];

  const dispatch = useDispatch();

  const [productDetails, setProductDetails] = useState(null);

  const fetchProductDetails = async () => {
    const data = await getProduct(productId);
    return data;
  };

  useEffect(() => {
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.LOAD }));
    fetchProductDetails().then((data) => {
      setProductDetails(data);
      dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
    });
  }, []);

  return productDetails && <Header productDetails={productDetails} />;
}

export default ProductDetails;
