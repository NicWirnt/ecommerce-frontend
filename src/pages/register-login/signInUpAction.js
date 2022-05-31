import { isPending, responseResolved } from "./signInUpSlice";

export const postUserAction = (user) => async (dispatch) => {
  dispatch(isPending());

  // call Axios Helper to call API
};
