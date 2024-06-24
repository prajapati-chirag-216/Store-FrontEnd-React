import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import classes from "./index.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Input = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  const [passIsVisible, setPassIsVisible] = useState(false);
  const activate = () => {
    inputRef.current.focus();
  };
  useImperativeHandle(ref, () => {
    return {
      focus: activate,
      files: inputRef.current.files,
    };
  });
  const changePassVisibility = () => {
    setPassIsVisible((prevState) => !prevState);
  };
  return props.type == "textarea" ? (
    <div className={classes["form-group"]}>
      <textarea
        className={`${classes["input"]} ${classes["input-textarea"]} ${
          props.isValid == false
            ? classes["input-invalid"]
            : classes["input-valid"]
        }`}
        ref={inputRef}
        name={props.name || ""}
        placeholder={props.placeholder || ""}
        value={props.value}
        onChange={props.onChange || null}
        onBlur={props.onBlur || null}
        required={props.required}
        readOnly={props.readOnly}
        autoComplete="off"
        rows={props.rows}
        maxLength={props.maxLength}
      />
      <label htmlFor="name" className={classes["label"]}>
        {props.placeholder}
      </label>
    </div>
  ) : (
    <div className={classes["form-group"]}>
      {props.type == "password" &&
        (passIsVisible ? (
          <VisibilityIcon onClick={changePassVisibility} />
        ) : (
          <VisibilityOffIcon onClick={changePassVisibility} />
        ))}
      <input
        className={`${classes["input"]} ${
          props.isValid == false
            ? classes["input-invalid"]
            : classes["input-valid"]
        }`}
        ref={inputRef}
        type={
          props.type == "password"
            ? passIsVisible
              ? "text"
              : "password"
            : props.type
        }
        name={props.name || ""}
        placeholder={props.placeholder || ""}
        value={props.value}
        onChange={props.onChange || null}
        onBlur={props.onBlur || null}
        required={props.required}
        readOnly={props.readOnly}
        maxLength={props.maxLength}
        autoComplete={props.autoComplete || "on"}
      />
      <label htmlFor="name" className={classes["label"]}>
        {props.placeholder}
      </label>
    </div>
  );
});
export default Input;
