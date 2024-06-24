import { getAccessToken } from "../utils/api";
export function cookieParser() {
  const data = {};
  document.cookie.split(";").map((ele) => {
    return (data[ele.trim().split("=")[0]] = ele.split("=")[1]);
  });
  return data;
}

export const genrateAccessToken = async () => {
  const response = await getAccessToken();
  return response;
};

export const formateData = (value, formateWith, validLength) => {
  let data = value.replace(/\s/g, "").replace(/\D/g, "");

  let formattedData = "";

  for (let i = 0; i < data.length; i++) {
    formattedData += data[i];
    if ((i + 1) % 4 === 0 && i !== data.length - 1) {
      formattedData += formateWith;
    }
  }

  if (data.length > validLength) {
    data = data.slice(0, validLength - 1);
    formattedData = formattedData.slice(0, validLength + 2);
  }
  return formattedData;
};

export const formateDate = (value) => {
  let extractedDate = value.replace(/\s/g, "").replace(/\D/g, "");

  let tempDate = "";

  for (let i = 0; i < extractedDate.length; i++) {
    tempDate += extractedDate[i];
    if (tempDate.length === 2) {
      tempDate += "/";
    }
  }
  if (tempDate.length > 5) {
    tempDate = tempDate.slice(0, 5);
  }
  let newDate = tempDate.split("/");
  let isValid = newDate[0] !== "00" && +newDate[0] <= 12 && +newDate[1] > 23; // letter we will change to currunt time
  return { tempDate, isValid };
};

//this functions are for selectors
export const findCountryValueHandler = (countryList, countryName) => {
  let countryId, countryValue;
  for (let i = 0; i < countryList.length; i++) {
    if (countryList[i].name == countryName) {
      countryId = countryList[i].id;
      countryValue = +countryList[i].id.slice(-1);
      break;
    }
  }
  return { countryId, countryValue };
};
export const findStateValueHandler = (stateList, stateName, countryId) => {
  let stateId, stateValue;
  for (let i = 0; i < stateList.length; i++) {
    if (stateList[i].name == stateName && stateList[i].id.includes(countryId)) {
      stateId = stateList[i].id;
      stateValue = +stateList[i].id.slice(-1);
      break;
    }
  }
  return { stateId, stateValue };
};
export const findCityValueHandler = (cityList, cityName, stateId) => {
  let cityValue;
  for (let i = 0; i < cityList.length; i++) {
    if (cityList[i].name == cityName && cityList[i].id.includes(stateId)) {
      cityValue = +cityList[i].id.slice(-1);
      break;
    }
  }
  return cityValue;
};
