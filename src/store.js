import { configureStore } from "@reduxjs/toolkit";
import SignInUpReducer from "./pages/register-login/signInUpSlice.js";
import SystemReducer from "./system-state/systemSlice.js";
import adminReducer from "./pages/admin-profile/AdminProfileSlice";
import categoryReducer from "./pages/category/categorySlice";
import productReducer from "./pages/product/productSlice";
import paymentMethodReducer from "./pages/payment-method/paymentMethodSlice";

const store = configureStore({
  reducer: {
    signInUp: SignInUpReducer,
    system: SystemReducer,
    admin: adminReducer,
    category: categoryReducer,
    productStore: productReducer,
    paymentMethod: paymentMethodReducer,
  },
});

export default store;
