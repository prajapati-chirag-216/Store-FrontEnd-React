import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderInfo: JSON.parse(sessionStorage.getItem("orderInfo")) || [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderInfo(state, action) {
      const updatedInfo = { ...state.orderInfo, ...action.payload };
      state.orderInfo = updatedInfo;
      sessionStorage.setItem("orderInfo", JSON.stringify(updatedInfo));
    },
    clearOrderInfo(state, action) {
      sessionStorage.removeItem("orderInfo");
      state.orderInfo = [];
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
