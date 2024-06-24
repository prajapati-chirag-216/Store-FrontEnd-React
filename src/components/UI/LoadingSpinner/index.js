import React from "react";
import { CircularProgress } from "@mui/material";
import classes from "./index.module.css";

function LoadingSpinner() {
  return (
    <div className={classes["spinner-container"]}>
      <CircularProgress
        size={100}
        color="inherit"
        sx={{
          color: "var(--tertiary-font-color)",
        }}
      />
    </div>
  );
}

export default LoadingSpinner;
