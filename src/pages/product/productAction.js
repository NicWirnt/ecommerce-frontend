import {
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProducts,
  postProduct,
} from "../../helper/axiosHelper";
import { toast } from "react-toastify";
import { setProducts } from "./productSlice";

export const fetchProductAction = () => async (dispatch) => {
  // call axios helper api

  const response = await getProducts();

  response.status === "success" && dispatch(setProducts(response.result));
};

// export const postCategoryAction = (catObj) => async (dispatch) => {
//   const responsePromise = postCategories(catObj);
//   toast.promise(responsePromise, {
//     pendiing: "Please wait ....",
//   });
//   const result = await responsePromise;

//   toast[result.status](result.message);

//   result.status === "success" && dispatch(fetchCategoriesAction());
// };
