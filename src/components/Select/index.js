import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import classes from "./index.module.css";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    position: "relative",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontSize: "1.7rem",
    width: "100%",
    padding: "1.5rem 2rem",
    borderRadius: "2px",
    backgroundColor: "var(--color-white)",
    border: "none",
    display: "block",
    borderBottom: "3px solid var(--color-black)",
    boxSizing: "border-box",
  },
}));

const BasicSelect = forwardRef((props, ref) => {
  const [selectedOption, setSelectedOption] = useState(props.value || 1); // Initial selected value is empty

  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };
  const reset = () => {
    setSelectedOption(1);
  };
  const changeValue = (value) => {
    setSelectedOption(value);
  };
  useImperativeHandle(ref, () => {
    return {
      focus: activate,
      resetValue: reset,
      changeValue: changeValue,
      value:
        selectedOption !== ""
          ? props.options[selectedOption].name
          : "Select an option", // Placeholder text when no option is selected
      id: props.options[selectedOption].id, // You might handle the absence of ID for placeholder differently
    };
  });
  const selectChangeHandler = (event) => {
    const id = props.options[event.target.value].id;
    setSelectedOption(event.target.value);
    if (props.onChange) {
      props.onChange(id);
    }
  };

  return (
    <div
      className={classes["form-group"]}
      style={{
        marginTop: props?.mt ? props.mt : "auto",
        marginBottom: props?.mb ? props.mb : "auto",
      }}
    >
      <Select
        required
        value={selectedOption}
        input={<BootstrapInput />}
        defaultValue=""
        sx={{
          fontSize: "1.6rem",
          color: "var(--color-black)",
          textTransform: "capitalize",
        }}
        onChange={selectChangeHandler}
        id="select-input"
        name={props.name}
      >
        {props.options.map((option, index) => (
          <MenuItem
            key={option.id}
            value={index}
            disabled={index == 0}
            sx={{
              fontSize: "1.5rem",
              paddingLeft: "2rem",
              textTransform: "capitalize",
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
});
export default BasicSelect;
