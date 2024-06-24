import React, { Fragment } from "react";
import Product from "../Product";
import classes from "./index.module.css";
import Header from "./Header";
function Home() {
  return (
    <Fragment>
      <Header />
      <hr className={classes["divider"]}></hr>
      <Product />
    </Fragment>
  );
}
export default Home;
