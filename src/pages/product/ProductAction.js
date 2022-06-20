import { deleteProduct, getProducts } from "../../helper/axiosHelper";
import { toast } from "react-toastify";
import { setProducts } from "./ProductSlice";

export const fetchProductsAction = () => async (dispatch) => {
  // call axios helper api

  const response = await getProducts();

  response.status === "success" && dispatch(setProducts(response.result));
};

export const deleteProductById = (_id) => async (dispatch) => {
  const responsePromise = deleteProduct(_id);

  toast.promise(responsePromise, {
    pendiing: "Please wait ....",
  });
  const result = await responsePromise;

  toast[result.status](result.message);

  result.status === "success" && dispatch(fetchProductsAction());
};
