import { updateAdminUser } from "../../helper/axiosHelper";
import { toast } from "react-toastify";
import { setUser } from "./AdminProfileSlice";

export const updateAdminProfileAction = (obj) => async (dispatch) => {
  const promiseResponse = updateAdminUser(obj);

  toast.promise(promiseResponse, {
    pending: "Please Wait...",
  });

  const { status, message, user } = await promiseResponse;

  toast[status](message);

  status === "success" && dispatch(setUser(user));
};
