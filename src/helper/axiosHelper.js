import axios from "axios";

const rootUrlAPI = "http://localhost:8000/api/v1";
const adminAPI = rootUrlAPI + "/admin";
// http://localhost:8000/api/v1/admin/email-verification

export const postUser = async (usrObj) => {
  try {
    const { data } = await axios.post(adminAPI, usrObj);

    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postEmailVerification = async (obj) => {
  try {
    const { data } = await axios.post(adminAPI + "/email-verification", obj);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
