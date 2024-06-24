import React, { Suspense, useEffect } from "react";
import {
  Await,
  Navigate,
  Outlet,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { fetchUserProfile } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { SNACKBAR_DETAILS } from "../utils/variables";
import { uiActions } from "../store/ui-slice";

const ProtectedRoutes = (props) => {
  const dispatch = useDispatch();
  const loaderData = useLoaderData();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaderData) {
      dispatch(uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_UNAUTHORIZED }));
    } else if (!props?.isProfilePage && cartItems.length === 0) {
      navigate("/home", { replace: true });
      dispatch(uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_EMPTY_CART }));
    }
  }, []);

  return (
    <Suspense fallback={<CircularProgress sx={{ color: "black" }} />}>
      <Await resolve={loaderData}>
        {(isLoggedin) =>
          isLoggedin ? (
            <Outlet />
          ) : (
            <Navigate to={!isLoggedin ? "/auth" : "/home"} />
          )
        }
      </Await>
    </Suspense>
  );
};
export async function loader() {
  let res;
  try {
    res = await fetchUserProfile();
  } catch (err) {
    throw err;
  }
  return res;
}
export default ProtectedRoutes;
