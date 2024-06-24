import React from "react";
import classes from "./index.module.css";
function About() {
  return (
    <div className={classes["contact-container"]}>
      <img
        src="/book-img.png"
        alt="try again"
        className={classes["book-img"]}
      />
      <h2 className={classes["heading-tertiary"]}>
        Page is Under Constuction..
      </h2>
    </div>
  );
}

export default About;
