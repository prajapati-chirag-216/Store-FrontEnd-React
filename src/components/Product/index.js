import React, { useEffect, useState } from "react";
import Main from "../Main";
import { fetchProductByName, getAllProducts, sortItems } from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import ProductContent from "../Product/ProductContent";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { STATUS } from "../../utils/variables";

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const categoryId = pathName.split("/")[2];

  const [items, setItems] = useState([]);
  const [filterdItems, setFilterdItems] = useState([]);

  const fetchItemsHandler = async (id) => {
    const data = await getAllProducts();
    return data;
  };
  const navigateHandler = (id) => {
    navigate("/product/" + id);
  };
  const updateStateHandler = (data) => {
    setItems(data);
    setFilterdItems(data);
  };
  useEffect(() => {
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.LOAD }));
    fetchItemsHandler().then((data) => {
      updateStateHandler(data);
      dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
    });
  }, []);

  const searchChangeHandler = (eve) => {
    const searchTxt = eve.target.value;
    const filterdItems = fetchProductByName(searchTxt, items);
    setFilterdItems(filterdItems);
  };

  const sortItemsHandler = async (sortBy) => {
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.LOAD }));
    const sortedItems = await sortItems(categoryId, sortBy);
    updateStateHandler(sortedItems);
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
  };

  return (
    <Main
      name="Products"
      searchHolder="Search name"
      applyFilter={true}
      onSearch={searchChangeHandler}
      onSort={sortItemsHandler}
      gridContent={
        <ProductContent items={filterdItems} onClick={navigateHandler} />
      }
    />
  );
}

export default Product;
