import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import cartReducer from "./cart-slice";
import orderReducer from "./order-slice";
import itemReducer from "./item-slice";
const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    order: orderReducer,
    item: itemReducer,
  },
});
export default store;
