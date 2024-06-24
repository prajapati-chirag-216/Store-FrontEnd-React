import React from "react";
import classes from "./index.module.css";
function FilterBox(props) {
  return (
    <div className={classes["filter-box"]}>
      <div className={classes["filter-box--selector"]}>
        <input
          type="text"
          readOnly
          placeholder="Sort By"
          className={classes["input-filter"]}
        />
        <img src="/down-arr.png" alt="" />
      </div>
      <div className={classes["filter-box--value"]}>
        <li onClick={props.onSort.bind(null, "sortByHighPrice")}>
          price High to Low
        </li>
        <li onClick={props.onSort.bind(null, "sortByLowPrice")}>
          price Low to High
        </li>
        <li onClick={props.onSort.bind(null, "sortByNewDate")}>Letest</li>
        <li onClick={props.onSort.bind(null, "sortByOldDate")}>Oldest</li>
        <li onClick={props.onSort.bind(null, "sortByPopularity")}>
          Popularity
        </li>
      </div>
    </div>
  );
}

export default FilterBox;
