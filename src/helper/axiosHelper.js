import axios from "axios";

const rootUrlAPI = "http://localhost:8000/api/v1";
const adminAPI = rootUrlAPI + "/admin";
const catEP = rootUrlAPI + "/category";
const productEP = rootUrlAPI + "/products";
const paymentMethodEP = rootUrlAPI + "/payment-method";
// http://localhost:8000/api/v1/admin/email-verification
// ADMIN API
// data must be an object
const apiProcessor = async ({ method, url, dataObj }) => {
  try {
    const { data } = await axios({
      method,
      url,
      data: dataObj,
    });
    return data;
  } catch (error) {
    let message = error.message;

    if (error.message && error.response.data) {
      message = error.response.data.message;
    }

    return {
      status: "error",
      message,
    };
  }
};

// #### ADMIN EP
export const postUser = async (dataObj) => {
  const url = adminAPI;
  return apiProcessor({ method: "post", url, dataObj });
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
  return apiProcessor({ method: "put", url, dataObj });
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
  return apiProcessor({ method: "get", url });
};

export const postCategories = (dataObj) => {
  const url = catEP;
  return apiProcessor({ method: "post", url, dataObj });
};

export const updateCategory = (dataObj) => {
  const url = catEP;
  return apiProcessor({ method: "put", url, dataObj });
};

export const deleteCategory = (_id) => {
  const url = catEP;
  return apiProcessor({ method: "delete", url, dataObj: { _id } });
};

// ###### PRODUCT API EP ###########
export const getProducts = () => {
  const url = productEP;
  return apiProcessor({ method: "get", url });
};

export const getSingleProduct = (_id) => {
  const url = productEP + "/" + _id;
  return apiProcessor({ method: "get", url });
};

export const postProduct = (dataObj) => {
  const url = productEP;
  return apiProcessor({ method: "post", url, dataObj });
};

export const deleteProducts = (dataObj) => {
  const url = productEP;
  return apiProcessor({ method: "delete", url, dataObj });
};

export const updateProduct = (dataObj) => {
  const url = productEP;
  return apiProcessor({ method: "put", url, dataObj });
};

// ##### Payment Method API
export const getPaymentMethods = (_id) => {
  const url = _id ? paymentMethodEP + "/" + _id : paymentMethodEP;
  return apiProcessor({ method: "get", url });
};

export const postPaymentMethod = (dataObj) => {
  const url = paymentMethodEP;
  return apiProcessor({ method: "post", url, dataObj });
};

export const deletePaymentMethod = (_id) => {
  const url = paymentMethodEP + "/" + _id;
  return apiProcessor({ method: "delete", url });
};

export const updatePaymentMethod = (dataObj) => {
  const url = paymentMethodEP;
  return apiProcessor({ method: "put", url, dataObj });
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
  return apiProcessor({ method: "patch", url, dataObj });
};
