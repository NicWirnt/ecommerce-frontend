import { loginUser, postUser } from "../../helper/axiosHelper";
import { isPending, responseResolved } from "./signInUpSlice.js";
import { toast } from "react-toastify";
import { setUser } from "../admin-profile/AdminProfileSlice";

export const postUserAction = (user) => async (dispatch) => {
  dispatch(isPending());

  console.log(user);
  // call Axios Helper to call API

  const promiseData = postUser(user);

  toast.promise(promiseData, {
    pending: "Please Wait....",
  });

  const data = await promiseData;

  toast[data.status](data.message);
  dispatch(responseResolved(data));
};

export const postLoginAction = (user) => async (dispatch) => {
  dispatch(isPending);
  // call the api
  const promiseData = loginUser(user);

  toast.promise(promiseData, {
    pending: "Please Wait....",
  });

  const data = await promiseData;

  if (data.status === "success") {
    dispatch(setUser(data.user));
    return;
  }

  toast[data.status](data.message);
  dispatch(responseResolved(data));
};
