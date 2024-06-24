import { createSlice } from "@reduxjs/toolkit";
import { SNACKBAR_SEVERITY, STATUS } from "../utils/variables";

const initialState = {
  searchText: "",
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice.reducer;
