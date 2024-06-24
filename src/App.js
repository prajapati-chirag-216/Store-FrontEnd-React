import React from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Wrapper from "./components/UI/Wrapper";
import Layout from "./components/UI/Layout";
import Error from "./components/UI/Error";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProtectedRoutes, {
  loader as profileLoader,
} from "./routes/ProtectedRoutes";
import CheckoutPage from "./pages/CheckoutPage";
import Shipping from "./components/Checkout/Shipping";
import Information from "./components/Checkout/Information";
import ProfilePage from "./pages/ProfilePage";
import OrderHistory from "./components/Profile/OrderHistory";
import OrderStatus from "./components/Profile/OrderHistory/OrderStatus";
import "./App.css";
import ContactPage from "./pages/ContactPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Wrapper />} errorElement={<Error />}>
      <Route index element={<Navigate to="/home" />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route element={<ProtectedRoutes />} loader={profileLoader}>
        <Route path="/checkout/" element={<CheckoutPage />}>
          <Route index element={<Information />} />
          <Route path="shipping" element={<Shipping />} />
        </Route>
      </Route>

      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route
          element={<ProtectedRoutes isProfilePage={true} />}
          loader={profileLoader}
        >
          <Route path="/myProfile/" element={<ProfilePage />}>
            <Route index element={<OrderHistory />} />
            <Route path="orderStatus/:id" element={<OrderStatus />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
