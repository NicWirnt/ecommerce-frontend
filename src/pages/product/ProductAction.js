import { getProducts } from "../../helper/axiosHelper";
import { toast } from "react-toastify";
import { setProducts } from "./ProductSlice";

export const fetchProductsAction = () => async (dispatch) => {
  // call axios helper api

  const response = await getProducts();

  response.status === "success" && dispatch(setProducts(response.result));
};
