import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop(props) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    props.closeCart();
  }, [pathname]);

  return null;
}

export default ScrollToTop;
