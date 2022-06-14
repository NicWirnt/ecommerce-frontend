import axios from "axios";

const rootUrlAPI = "http://localhost:8000/api/v1";
const adminAPI = rootUrlAPI + "/admin";
const catEP = rootUrlAPI + "/category";

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

export const updateCategories = (dataObj) => {
  const url = catEP;
  return apiProcessor({ method: "post", url, dataObj });
};

export const deleteCategory = (_id) => {
  const url = catEP;
  return apiProcessor({ method: "delete", url, dataObj: { _id } });
};
