import { createSlice } from "@reduxjs/toolkit";
import { SNACKBAR_SEVERITY, STATUS } from "../utils/variables";

const initialState = {
  isLoadingBar: { status: STATUS.DEFAULT },
  snackBar: {
    status: false,
    message: "",
    severity: SNACKBAR_SEVERITY.DEFAULT,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsLoadingBar(state, action) {
      state.isLoadingBar = action.payload;
    },
    setSnackBar(state, action) {
      state.snackBar = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
