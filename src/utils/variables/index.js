export const STATUS = {
  DEFAULT: "NONE",
  LOAD: "LOAD",
  COMPLETE: "COMPLETE",
};

export const OPERATIONS = {
  DEFAULT: "None",
  FETCH: "Fetching..",
  ADD: "Adding..",
  UPDATE: "Updating..",
  DELETE: "Deleting..",
};

export const LIST = {
  COUNTRY_LIST: [
    { id: "default", name: "select country" },
    { id: "country-1", name: "india" },
    { id: "country-2", name: "united states" },
  ],
  STATE_LIST: [
    { id: "default", name: "select state" },
    { id: "country-1_state-1", name: "gujrat" },
    { id: "country-1_state-2", name: "rajasthan" },
    { id: "country-1_state-3", name: "maharashtra" },
    { id: "country-2_state-1", name: "california" },
  ],
  CITY_LIST: [
    { id: "default", name: "select city" },
    { id: "country-1_state-1_city-1", name: "ahmedabad" },
    { id: "country-1_state-1_city-2", name: "surat" },
    { id: "country-1_state-2_city-1", name: "jaswantpur" },
    { id: "country-1_state-2_city-2", name: "udaypur" },
    { id: "country-1_state-3_city-1", name: "mumbai" },
    { id: "country-1_state-3_city-2", name: "pune" },
    { id: "country-2_state-1_city-1", name: "san francisco" },
  ],
  DEFAULT_CITY_LIST: [
    { id: "default", name: "select city" },
    { id: "country-1_state-1_city-1", name: "ahmedabad" },
    { id: "country-1_state-1_city-2", name: "surat" },
  ],
  DEFAULT_STATE_LIST: [
    { id: "default", name: "select city" },
    { id: "country-1_state-1", name: "gujrat" },
    { id: "country-1_state-2", name: "rajasthan" },
    { id: "country-1_state-3", name: "maharashtra" },
  ],
};

export const METHOD_OPTIONS = {
  ONLINE: "Online",
  COD: "Cash On Delivery",
};

export const SNACKBAR_SEVERITY = {
  DEFAULT: "default",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export const SNACKBAR_DETAILS = {
  ON_SIGNED_UP: {
    status: true,
    severity: SNACKBAR_SEVERITY.SUCCESS,
    message: "Welcome To Store!",
  },
  ON_LOGGED_IN: {
    status: true,
    severity: SNACKBAR_SEVERITY.SUCCESS,
    message: "Succesfully Logged In",
  },
  ON_LOGGED_OUT: {
    status: true,
    severity: SNACKBAR_SEVERITY.SUCCESS,
    message: "Succesfully Logged Out",
  },
  ON_ERROR: {
    status: true,
    severity: SNACKBAR_SEVERITY.ERROR,
    message: "Somthing Went Wrong",
  },
  ON_UNAUTHORIZED: {
    status: true,
    severity: SNACKBAR_SEVERITY.WARNING,
    message: "You need to login to your account",
  },
  ON_EMPTY_CART: {
    status: true,
    severity: SNACKBAR_SEVERITY.INFO,
    message: "Your cart is empty",
  },
  ON_ORDER_PLACED: {
    status: true,
    severity: SNACKBAR_SEVERITY.SUCCESS,
    message: "Order confirmed!",
  },
  ON_ORDER_CANCLED: {
    status: true,
    severity: SNACKBAR_SEVERITY.ERROR,
    message:
      "Oops! Something went wrong while processing your order. Please try again.",
  },
  ON_NOT_AVAILABLE: {
    status: true,
    severity: SNACKBAR_SEVERITY.INFO,
    message:
      "Oops! Some items are unavailable. Please remove them and proceed.",
  },
  ON_ADD_ITEM: {
    status: true,
    severity: SNACKBAR_SEVERITY.SUCCESS,
    message: "Item Added",
  },
  ON_DUPLICATE_CREDENTIALS: {
    status: true,
    severity: SNACKBAR_SEVERITY.WARNING,
    message: "Email already in use. Try another or log in.",
  },
};

export const STEP_LABELS_CHECKOUT = ["Information", "Shipping", "Payment"];
export const STEP_LABELS_ORDER_STATUS = ["Pending", "Shipped", "Reaching"];

export const VALIDATION_MESSAGES = {
  NAME: "Name: 5-30 characters, cannot start with a number.",
  EMAIL: "Enter a valid email address.",
  PASSWORD: "Password: 6-10 characters, avoid 'password'.",
  PHONENO: "Enter a valid phone number.",
  NUMBER: "Enter a valid number > 0.",
  GENERAL: "Enter 6-300 characters.",
  PINCODE: "Enter a valid 6-digit PIN code.",
  CARDNO: "Enter a valid 14-digit card number.",
  CVV: "CVV: 3-4 digits.",
  EXPIRYDATE: "Enter a valid expiry date.",
  DESCRIPTION: "Description: 40-400 characters.",
  IMAGE: "Image is required (jpeg,png,jpg)",
};
