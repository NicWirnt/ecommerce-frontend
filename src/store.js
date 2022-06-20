import { configureStore } from "@reduxjs/toolkit";
import SignInUpReducer from "./pages/register-login/signInUpSlice.js";
import SystemReducer from "./system-state/systemSlice.js";
import adminReducer from "./pages/admin-profile/AdminProfileSlice";
import categoryReducer from "./pages/category/categorySlice";
import productReducer from "./pages/product/ProductSlice";

const store = configureStore({
  reducer: {
    signInUp: SignInUpReducer,
    system: SystemReducer,
    admin: adminReducer,
    category: categoryReducer,
    product: productReducer,
  },
});

export default store;
