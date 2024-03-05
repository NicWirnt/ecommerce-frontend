import axios from "axios";

const rootUrlAPI = "http://localhost:8000/api/v1";
// const rootUrlAPI = "https://enigmatic-badlands-17073.herokuapp.com/api/v1";
const adminAPI = rootUrlAPI + "/admin";
const catEP = rootUrlAPI + "/category";
const productEP = rootUrlAPI + "/products";
const paymentMethodEP = rootUrlAPI + "/payment-method";
const customerEP = rootUrlAPI + "/customers";
const reviewEP = rootUrlAPI + "/reviews";
const ordersEP = rootUrlAPI + "/orders";

// http://localhost:8000/api/v1/admin/email-verification
// ADMIN API
// data must be an object
const apiProcessor = async ({ method, url, dataObj, headers }) => {
  try {
    const { data } = await axios({
      method,
      url,
      data: dataObj,
      headers,
    });
    return data;
  } catch (error) {
    let message = error.message;

    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
      return {
        status: "error",
        message: "Unauthenticated",
      };
    }

    if (error.message && error.response.data) {
      message = error.response.data.message;
    }

    if (message === "JWT expired!!") {
      // call the api to get new refreshJWT and re call the api Processor itself
      const accessJWT = await requestNewAccessJWT();

      if (accessJWT) {
        return apiProcessor({
          method,
          url,
          dataObj,
          headers: {
            Authorization: accessJWT,
          },
        });
      }
    }

    return {
      status: "error",
      message,
    };
  }
};

//api jwt
export const requestNewAccessJWT = async () => {
  const { accessJWT } = await apiProcessor({
    method: "get",
    url: adminAPI + "/accessjwt",
    headers: {
      Authorization: localStorage.getItem("refreshJWT"),
    },
  });
  sessionStorage.setItem("accessJWT", accessJWT);
  return accessJWT;
};

// #### ADMIN EP
export const getAdminUser = () => {
  const url = adminAPI;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postUser = (dataObj) => {
  const url = adminAPI;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postEmailVerification = (dataObj) => {
  const url = adminAPI + "/email-verification";
  return apiProcessor({ method: "post", url, dataObj });
};

export const loginUser = (dataObj) => {
  const url = adminAPI + "/login";
  return apiProcessor({ method: "post", url, dataObj });
};

// ### UPDATE ADMIN PROFILE
export const updateAdminUser = async (dataObj) => {
  const url = adminAPI;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// export const postUser = async (usrObj) => {
//   try {
//     const { data } = await axios.post(adminAPI, usrObj);

//     return data;
//   } catch (error) {
//     console.log(error);
//     return {
//       status: "error",
//       message: error.message,
//     };
//   }
// };

// export const postEmailVerification = async (obj) => {
//   try {
//     const { data } = await axios.post(adminAPI + "/email-verification", obj);
//     return data;
//   } catch (error) {
//     console.log(error);
//     return {
//       status: "error",
//       message: error.message,
//     };
//   }
// };
// export const loginUser = async (usrObj) => {
//   try {
//     const { data } = await axios.post(adminAPI + "/login", usrObj);

//     return data;
//   } catch (error) {
//     return {
//       status: "error",
//       message: error?.response?.data?.message || error.message,
//     };
//   }
// };

// === Category API ====

export const getCategories = () => {
  const url = catEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postCategories = (dataObj) => {
  const url = catEP;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const updateCategory = (dataObj) => {
  const url = catEP;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const deleteCategory = (_id) => {
  const url = catEP;
  return apiProcessor({
    method: "delete",
    url,
    dataObj: { _id },
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// ###### PRODUCT API EP ###########
export const getProducts = () => {
  const url = productEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const getSingleProduct = (_id) => {
  const url = productEP + "/" + _id;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postProduct = (dataObj) => {
  const url = productEP;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const deleteProducts = (dataObj) => {
  const url = productEP;
  return apiProcessor({
    method: "delete",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const updateProduct = (dataObj) => {
  const url = productEP;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// ##### Payment Method API
export const getPaymentMethods = (_id) => {
  const url = _id ? paymentMethodEP + "/" + _id : paymentMethodEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postPaymentMethod = (dataObj) => {
  const url = paymentMethodEP;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const deletePaymentMethod = (_id) => {
  const url = paymentMethodEP + "/" + _id;
  return apiProcessor({
    method: "delete",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const updatePaymentMethod = (dataObj) => {
  const url = paymentMethodEP;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// #### REQUEST OTP

export const requestPasswordResetOTP = (dataObj) => {
  const url = adminAPI + "/otp-request";
  return apiProcessor({ method: "post", url, dataObj });
};

//reset password
export const updateAdminPassword = (dataObj) => {
  const url = adminAPI + "/password";
  return apiProcessor({ method: "patch", url, dataObj });
};

//update password
export const updateAdminPasswordFormProfile = (dataObj) => {
  const url = adminAPI + "/update-password";
  return apiProcessor({
    method: "patch",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// CUSTOMER MANAGEMENT API
export const getCustomers = (_id) => {
  const url = _id ? customerEP + "/" + _id : customerEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// REVIEW API
export const getReview = () => {
  const url = reviewEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// Orders API
export const getOrders = () => {
  const url = ordersEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};
