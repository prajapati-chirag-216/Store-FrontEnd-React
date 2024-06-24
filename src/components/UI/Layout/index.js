import React, { useState } from "react";
import classes from "./index.module.css";
import { Outlet } from "react-router-dom";
import Navigation from "../../UI/Navigation";
import Footer from "../../Footer";
import Cart from "../../Cart";
import ScrollToTop from "../ScrollToTop";
function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const openCartHandler = () => setIsOpen(true);
  const closeCartHandler = () => setIsOpen(false);
  return (
    <div className={classes["main-container"]}>
      {/* we are closing cart(if it was opened) in ScrollToTop component when ever use navigaes to diffrent page */}
      <ScrollToTop closeCart={closeCartHandler} />

      <Cart isOpen={isOpen} onClose={closeCartHandler} />
      <Navigation onOpen={openCartHandler} />
      <div className={classes["container-content"]}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
