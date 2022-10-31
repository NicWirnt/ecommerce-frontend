import { getAdminUser, loginUser, postUser } from "../../helper/axiosHelper";
import { isPending, responseResolved } from "./signInUpSlice.js";
import { toast } from "react-toastify";
import { setUser } from "../admin-profile/AdminProfileSlice";
import { requestNewAccessJWT } from "../../helper/axiosHelper.js";

export const postUserAction = (user) => async (dispatch) => {
  dispatch(isPending());

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
    sessionStorage.setItem("accessJWT", data.accessJWT);
    localStorage.setItem("refreshJWT", data.refreshJWT);

    dispatch(setUser(data.user));
  }

  toast[data.status](data.message);
  dispatch(responseResolved(data));
};

const fetchUser = (accessJWT) => async (dispatch) => {
  const response = await getAdminUser();

  response.status === "success" && dispatch(setUser(response.user));
};

export const authoAdminLogin = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  //if accessJWT exist, fetch user and mount user in our state
  //else
  //if refreshJWT exist, fetch new accessJWT and fetch the user
  if (accessJWT) {
    dispatch(fetchUser());
    return;
  } else if (refreshJWT) {
    const token = await requestNewAccessJWT();
    token ? dispatch(fetchUser()) : dispatch(adminLogout());
  } else {
    dispatch(adminLogout());
  }
};

export const adminLogout = () => (dispatch) => {
  sessionStorage.removeItem("accessJWT");
  localStorage.removeItem("refreshJWT");
  dispatch(setUser({}));
};
