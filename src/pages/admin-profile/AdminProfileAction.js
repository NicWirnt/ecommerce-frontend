import {
  requestPasswordResetOTP,
  updateAdminPassword,
  updateAdminPasswordFormProfile,
  updateAdminUser,
} from "../../helper/axiosHelper";
import { toast } from "react-toastify";
import {
  setIsLoading,
  setPassResetResponse,
  setPassResettingEmail,
  setUser,
} from "./AdminProfileSlice";

export const updateAdminProfileAction = (obj) => async (dispatch) => {
  const promiseResponse = updateAdminUser(obj);

  toast.promise(promiseResponse, {
    pending: "Please Wait...",
  });

  const { status, message, user } = await promiseResponse;

  toast[status](message);

  status === "success" && dispatch(setUser(user));
};

export const requestPassResetOTPAction = (obj) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await requestPasswordResetOTP(obj);
  dispatch(setPassResettingEmail(obj.email));
  dispatch(setPassResetResponse(response));
};

export const resetPassAction = (obj) => async (dispatch) => {
  const responsePromise = updateAdminPassword(obj);
  toast.promise(responsePromise, {
    pending: "Please Wait...",
  });

  const { status, message } = await responsePromise;

  toast[status](message);
};

//udpate password
export const updatePassAction = (obj) => async (dispatch) => {
  const responsePromise = updateAdminPasswordFormProfile(obj);

  toast.promise(responsePromise, {
    pending: "Please Wait...",
  });

  const { status, message } = await responsePromise;

  toast[status](message);
};
