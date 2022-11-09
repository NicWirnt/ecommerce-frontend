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
  const { status, products } = response;

  status === "success" && products.length && dispatch(setProducts(products));
};

export const fetchSingleProductAction = (_id) => async (dispatch) => {
  // call axios helper api

  const response = await getSingleProduct(_id);

  response.status === "success" &&
    dispatch(setSeletectedProduct(response.products));
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
  const { status, message, result } = await responsePromise;

  toast[status](message);

  status === "success" && dispatch(setSeletectedProduct(result));
};
