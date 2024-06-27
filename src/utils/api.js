import AxiosInstance from "./AxiosInstance";

export async function signupUser(userData) {
  const config = {
    method: "POST",
    url: `/user/signup`,
    data: userData,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export async function fetchUserProfile() {
  try {
    const config = {
      url: `/user/profile`,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function loginUser(userData) {
  const config = {
    method: "POST",
    url: `/user/login`,
    data: userData,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export async function logoutUser() {
  const config = {
    method: "POST",
    url: `/user/logout`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export async function forgotPassword(userData) {
  const config = {
    method: "POST",
    url: `/user/forgotPassword`,
    data: userData,
  };
  const response = await AxiosInstance(config);
  return response;
}

export async function resetPassword(userData) {
  const config = {
    method: "POST",
    url: `/user/resetPassword/${userData.id}`,
    data: { password: userData.password },
  };
  const response = await AxiosInstance(config);
  return response;
}

export const getProduct = async (id) => {
  const config = {
    url: `/getproduct/${id}`,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const addCartItems = async (items) => {
  const config = {
    method: "POST",
    url: `/addCartItems`,
    data: items,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const postOrder = async (orderData) => {
  try {
    const config = {
      method: "POST",
      url: `/postOrder`,
      data: orderData,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getUserOrders = async () => {
  try {
    const config = {
      method: "get",
      url: `/getUserOrders`,
      withCredentials: true,
    };

    const response = await AxiosInstance(config);

    return response;
  } catch (err) {
    throw err;
  }
};

export const getOrderById = async (id) => {
  const config = {
    url: `/getOrder/${id}`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const getAccessToken = async () => {
  try {
    const config = {
      url: "/user/getAccessToken",
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const fetchFilteredItems = async (
  windowSize,
  skip,
  sortBy,
  searchTxt = "all"
) => {
  const config = {
    url: `/getfilteredproducts/${windowSize}/${skip}/${sortBy}/${searchTxt}`,
  };
  const response = await AxiosInstance(config);
  return response;
};
