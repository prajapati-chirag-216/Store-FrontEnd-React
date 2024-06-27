import React, { Fragment, useEffect, useState } from "react";
import Main from "../Main";
import { fetchFilteredItems } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import ProductContent from "../Product/ProductContent";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { STATUS, WINDOW_SIZE } from "../../utils/variables";
import Button from "../Button";
import classes from "./index.module.css";

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [pageNo, setPageNo] = useState(+localStorage.getItem("pageNo") || 1);
  const [haveMoreData, setHaveMoreData] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("sortByNewDate");
  const [searchText, setSearchText] = useState("");

  const onNextPageHandler = () => {
    setPageNo((prevPage) => prevPage + 1);
  };
  const navigateHandler = (id) => {
    navigate("/product/" + id);
  };
  const updateStateHandler = (data) => {
    setItems(data);
  };

  // we will do this after
  useEffect(() => {
    fetchItemsHandler(currentFilter).then((data) => {
      setHaveMoreData(data.haveMore);
      if (pageNo == 1) {
        updateStateHandler(data.products);
      } else {
        updateStateHandler([...items, ...data.products]);
      }
    });
  }, [pageNo, currentFilter, searchText]);

  const fetchItemsHandler = async (sortBy) => {
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.LOAD }));
    const sortedItems = await fetchFilteredItems(
      WINDOW_SIZE,
      pageNo - 1,
      sortBy,
      searchText == "" ? "all" : searchText
    );
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
    return sortedItems;
  };

  const changeFilterHandler = async (sortBy) => {
    setPageNo(1);
    setCurrentFilter(sortBy);
  };

  const searchChangeHandler = (eve) => {
    const searchTxt = eve.target.value.trim();
    setPageNo(1);
    setSearchText(searchTxt);
  };

  return (
    <Fragment>
      <Main
        name="Products"
        searchHolder="Search name"
        applyFilter={true}
        onSearch={searchChangeHandler}
        onSort={changeFilterHandler}
        gridContent={<ProductContent items={items} onClick={navigateHandler} />}
      />
      <div className={classes["btn-container"]}>
        {haveMoreData && (
          <Button
            className="btn-small"
            width="20rem"
            onClick={onNextPageHandler}
          >
            Load more
          </Button>
        )}
      </div>
    </Fragment>
  );
}

export default Product;
