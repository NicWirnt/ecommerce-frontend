import {
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProducts,
  postProduct,
} from "../../helper/axiosHelper";
import { toast } from "react-toastify";
import { setProducts, setSeletectedProduct } from "./productSlice";

export const fetchProductAction = () => async (dispatch) => {
  // call axios helper api

  const response = await getProducts();

  response.status === "success" && dispatch(setProducts(response.result));
};

export const fetchSingleProductAction = (_id) => async (dispatch) => {
  // call axios helper api

  const response = await getSingleProduct(_id);

  response.status === "success" &&
    dispatch(setSeletectedProduct(response.result));
};
export const postProductAction = (dataObj) => async (dispatch) => {
  const responsePromise = postProduct(dataObj);

  toast.promise(responsePromise, {
    pending: "Please wait .....",
  });

  const { status, message } = await responsePromise;

  toast[status](message);

  status === "success" && dispatch(fetchProductAction());
};

export const deleteProductAction = (ids) => async (dispatch) => {
  const response = deleteProducts(ids);

  toast.promise(response, {
    pending: "Please Wait ...",
  });

  const { status, message } = await response;

  toast[status](message);

  status === "success" && dispatch(fetchProductAction());
};

export const updateProductAction = (obj) => async (dispatch) => {
  const responsePromise = updateProduct(obj);
  toast.promise(responsePromise, {
    pendiing: "Please wait ....",
  });
  const result = await responsePromise;

  toast[result.status](result.message);

  result.status === "success" && dispatch(fetchProductAction());
};
