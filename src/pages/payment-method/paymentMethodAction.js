import { toast } from "react-toastify";
import {
  deletePaymentMethod,
  getPaymentMethods,
  postPaymentMethod,
  updatePaymentMethod,
} from "../../helper/axiosHelper";
import { toggleModal } from "../../system-state/systemSlice";
import {
  setPaymentMethod,
  setSelectedPaymentMethod,
} from "./paymentMethodSlice";

export const fetchPaymentMethodsAction = () => async (dispatch) => {
  const response = await getPaymentMethods();

  response.status === "success" && dispatch(setPaymentMethod(response.result));
};

export const fetchSinglePaymentMethodsAction = (_id) => async (dispatch) => {
  //call axioshelper to call api
  const response = await getPaymentMethods(_id);

  //get data and set to state
  response.status === "success" &&
    dispatch(setSelectedPaymentMethod(response.result));
};

export const postPaymentMethodAction = (obj) => async (dispatch) => {
  const responsePromise = postPaymentMethod(obj);

  toast.promise(responsePromise, {
    pending: "Please Wait....",
  });

  const response = await responsePromise;

  toast[response.status](response.message);

  response.status === "success" && dispatch(fetchPaymentMethodsAction());
};

export const deletePaymentMethodAction = (_id) => async (dispatch) => {
  const responsePromise = deletePaymentMethod(_id);

  toast.promise(responsePromise, {
    pending: "Please Wait...",
  });

  const response = await responsePromise;

  toast[response.status](response.message);

  response.status === "success" && dispatch(fetchPaymentMethodsAction());
};

export const editPaymentMethodAction = (_id) => async (dispatch) => {
  dispatch(toggleModal());

  dispatch(fetchSinglePaymentMethodsAction(_id));
};

export const updatePaymentMethodAction = (dataObj) => async (dispatch) => {
  const responsePromise = updatePaymentMethod(dataObj);

  toast.promise(responsePromise, {
    pending: "Please Wait ....",
  });

  const response = await responsePromise;

  toast[response.status](response.message);

  response.status === "success" &&
    dispatch(fetchPaymentMethodsAction()) &&
    dispatch(toggleModal());
};
