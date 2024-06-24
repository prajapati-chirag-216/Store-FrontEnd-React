import React, { useEffect, useReducer, useRef, useState } from "react";
import classes from "./index.module.css";
import Input from "../../../Input";
import Select from "../../../Select";
import Button from "../../..//Button";
import {
  nameReducer,
  pinCodeReducer,
  phoneNoReducer,
  generalReducer,
} from "../../../../reducers";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSelector } from "react-redux";
import { LIST, VALIDATION_MESSAGES } from "../../../../utils/variables";
import {
  findCityValueHandler,
  findCountryValueHandler,
  findStateValueHandler,
} from "../../../../utils/function";

function Form(props) {
  const orderInfo = useSelector((state) => state.order.orderInfo);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const addressRef = useRef(null);
  const countryRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const pinCodeRef = useRef(null);
  const phoneNoRef = useRef(null);

  const [stateList, setStateList] = useState(LIST.DEFAULT_STATE_LIST);
  const [cityList, setCityList] = useState(LIST.DEFAULT_CITY_LIST);

  const stateChangeHandler = (id) => {
    const states = LIST.STATE_LIST.filter((state) =>
      state.id.includes(`${id}_state`)
    );
    setStateList([{ id: "default", name: "select state" }, ...states]);
    stateRef.current.resetValue();
    cityChangeHandler(`${id}_state-1`);
  };

  const cityChangeHandler = (id) => {
    const cities = LIST.CITY_LIST.filter((city) =>
      city.id.includes(`${id}_city`)
    );
    setCityList([{ id: "default", name: "select city" }, ...cities]);
    cityRef.current.resetValue();
  };

  const [formIsValid, setFormIsValid] = useState(false);

  const [phoneNoState, dispatchPhoneNo] = useReducer(phoneNoReducer, {
    value: "",
    isValid: null,
  });
  const [firstNameState, dispatchFirstName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });
  const [lastNameState, dispatchLastName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });
  const [addressState, dispatchAddress] = useReducer(generalReducer, {
    value: "",
    isValid: null,
  });
  const [pinCodeState, dispatchPinCode] = useReducer(pinCodeReducer, {
    value: "",
    isValid: null,
  });

  const phoneNoChangeHandler = (event) => {
    dispatchPhoneNo({
      type: "USER_INPUT",
      value: event.target.value.trimStart(),
    });
  };
  const firstNameChangeHandler = (event) => {
    dispatchFirstName({
      type: "USER_INPUT",
      value: event.target.value.trim(),
    });
  };
  const lastNameChangeHandler = (event) => {
    dispatchLastName({
      type: "USER_INPUT",
      value: event.target.value.trim(),
    });
  };
  const addressChangeHandler = (event) => {
    dispatchAddress({
      type: "USER_INPUT",
      value: event.target.value.trimStart(),
    });
  };
  const pinCodeChangeHandler = (event) => {
    dispatchPinCode({
      type: "USER_INPUT",
      value: event.target.value.trimStart(),
    });
  };

  // this will run on input gets out from focus
  const validatePhoneNoHandler = () => dispatchPhoneNo({ type: "INPUT_BLUR" });
  const validateFirstNameHandler = () =>
    dispatchFirstName({ type: "INPUT_BLUR" });
  const validateLastNameHandler = () =>
    dispatchLastName({ type: "INPUT_BLUR" });
  const validateAddressHandler = () => dispatchAddress({ type: "INPUT_BLUR" });
  const validatePinCodeHandler = () => dispatchPinCode({ type: "INPUT_BLUR" });

  const { isValid: phoneNoIsValid } = phoneNoState;
  const { isValid: firstNameIsValid } = firstNameState;
  const { isValid: lastNameIsValid } = lastNameState;
  const { isValid: addressIsValid } = addressState;
  const { isValid: pinCodeIsValid } = pinCodeState;

  useEffect(() => {
    dispatchFirstName({
      type: "INPUT_FETCH",
      value: orderInfo?.shippingAddress?.userName?.split(" ")[0] || "",
    });
    dispatchLastName({
      type: "INPUT_FETCH",
      value: orderInfo?.shippingAddress?.userName?.split(" ")[1] || "",
    });
    dispatchPhoneNo({
      type: "INPUT_FETCH",
      value: orderInfo?.contactInformation?.phoneNo || "",
    });
    dispatchAddress({
      type: "INPUT_FETCH",
      value: orderInfo?.shippingAddress?.address || "",
    });
    dispatchPinCode({
      type: "INPUT_FETCH",
      value: orderInfo?.shippingAddress?.pinCode || "",
    });

    const countryName = orderInfo?.shippingAddress?.country;
    const stateName = orderInfo?.shippingAddress?.state;
    const cityName = orderInfo?.shippingAddress?.city;

    if (countryName) {
      const { countryId, countryValue } = findCountryValueHandler(
        LIST.COUNTRY_LIST,
        countryName
      );
      countryRef.current.changeValue(countryValue);

      if (stateName) {
        const { stateId, stateValue } = findStateValueHandler(
          LIST.STATE_LIST,
          stateName,
          countryId
        );
        stateChangeHandler(countryId);
        stateRef.current.changeValue(stateValue);

        if (cityName) {
          const cityValue = findCityValueHandler(
            LIST.CITY_LIST,
            cityName,
            stateId
          );
          cityChangeHandler(stateId);
          cityRef.current.changeValue(cityValue);
        } else {
          cityRef.current.resetValue();
        }
      } else {
        stateRef.current.resetValue();
        cityRef.current.resetValue();
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        phoneNoIsValid &&
          firstNameIsValid &&
          lastNameIsValid &&
          addressIsValid &&
          pinCodeIsValid
      );
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [
    phoneNoIsValid,
    firstNameIsValid,
    lastNameIsValid,
    addressIsValid,
    pinCodeIsValid,
  ]);

  const validateFormHandler = async (event) => {
    event.preventDefault();
    if (!pinCodeIsValid) {
      pinCodeRef.current.focus();
    }
    if (!addressIsValid) {
      addressRef.current.focus();
    }
    if (!lastNameIsValid) {
      lastNameRef.current.focus();
    }
    if (!firstNameIsValid) {
      firstNameRef.current.focus();
    }
    if (!phoneNoIsValid) {
      phoneNoRef.current.focus();
    }
  };
  const submitFormHandler = async (event) => {
    event.preventDefault();
    const data = {
      contactInformation: {
        phoneNo: phoneNoState.value,
      },
      shippingAddress: {
        userName: firstNameState.value + " " + lastNameState.value,
        address: addressState.value,
        pinCode: pinCodeState.value,
        country: countryRef.current.value,
        state: stateRef.current.value,
        city: cityRef.current.value,
      },
    };
    props.onSubmit(data);
  };

  return (
    <form
      className={classes["form"]}
      onSubmit={formIsValid ? submitFormHandler : validateFormHandler}
      method="post"
    >
      <div
        className={`${classes["info-container"]} ${classes["contact-info-container"]}`}
      >
        <h1 className={classes["container-heading"]}>contact Information</h1>
        {phoneNoIsValid == false && (
          <span className={classes["invalid-txt"]}>
            {VALIDATION_MESSAGES.PHONENO}
          </span>
        )}
        <Input
          ref={phoneNoRef}
          type="text"
          onChange={phoneNoChangeHandler}
          onBlur={validatePhoneNoHandler}
          placeholder="Phone no"
          name="firstName"
          value={phoneNoState.value}
          isValid={phoneNoIsValid}
        />
      </div>
      <div
        className={`${classes["info-container"]} ${classes["shipping-info-container"]}`}
      >
        <h1 className={classes["container-heading"]}>Shipping Information</h1>
        {/* This is just for validations, added here other wise it will push specific input tag to down */}
        {(firstNameIsValid == false || lastNameIsValid == false) && (
          <div className={classes["row-inp"]}>
            <div>
              {firstNameIsValid == false && (
                <span className={classes["invalid-txt"]}>
                  {VALIDATION_MESSAGES.NAME}
                </span>
              )}
            </div>
            <div>
              {lastNameIsValid == false && (
                <span className={classes["invalid-txt"]}>
                  {VALIDATION_MESSAGES.NAME}
                </span>
              )}
            </div>
          </div>
        )}
        <div className={classes["row-inp"]}>
          <Input
            ref={firstNameRef}
            type="text"
            onChange={firstNameChangeHandler}
            onBlur={validateFirstNameHandler}
            placeholder="First name"
            name="firstName"
            value={firstNameState.value}
            isValid={firstNameIsValid}
          />
          <Input
            ref={lastNameRef}
            type="text"
            onChange={lastNameChangeHandler}
            onBlur={validateLastNameHandler}
            placeholder="Last name"
            name="lastName"
            value={lastNameState.value}
            isValid={lastNameIsValid}
          />
        </div>
        {/* This is just for validations, added here other wise it will push specific input tag to down */}
        {(addressIsValid == false || pinCodeIsValid == false) && (
          <div className={`${classes["row-inp"]} ${classes["row-inp_2-3"]}`}>
            <div>
              {addressIsValid == false && (
                <span className={classes["invalid-txt"]}>
                  {VALIDATION_MESSAGES.GENERAL}
                </span>
              )}
            </div>
            <div>
              {pinCodeIsValid == false && (
                <span className={classes["invalid-txt"]}>
                  {VALIDATION_MESSAGES.PINCODE}
                </span>
              )}
            </div>
          </div>
        )}
        <div className={`${classes["row-inp"]} ${classes["row-inp_2-3"]}`}>
          <Input
            ref={addressRef}
            type="text"
            placeholder="Address"
            onChange={addressChangeHandler}
            onBlur={validateAddressHandler}
            name="address"
            value={addressState.value}
            isValid={addressIsValid}
          />

          <Input
            ref={pinCodeRef}
            type="text"
            placeholder="PinCode"
            onChange={pinCodeChangeHandler}
            onBlur={validatePinCodeHandler}
            name="address"
            value={pinCodeState.value}
            isValid={pinCodeIsValid}
          />
        </div>

        <div className={classes["row-inp"]} style={{ marginBottom: "2rem" }}>
          <Select
            ref={countryRef}
            placeholder="Country"
            name="country"
            options={LIST.COUNTRY_LIST}
            onChange={stateChangeHandler}
          />
          <Select
            ref={stateRef}
            placeholder="State"
            name="state"
            options={stateList}
            onChange={cityChangeHandler}
          />
          <Select
            ref={cityRef}
            placeholder="City"
            name="city"
            options={cityList}
          />
        </div>
      </div>
      <div className={classes["btn-container"]}>
        <div className={classes["back-link"]} onClick={props.onBack}>
          <ChevronLeftIcon sx={{ fontSize: "2.5rem" }} />
          <h1>Back </h1>
        </div>
        <Button className="btn-large" fontSize="2.2rem" width="35rem">
          Continue To Shipping
        </Button>
      </div>
    </form>
  );
}
export default Form;
