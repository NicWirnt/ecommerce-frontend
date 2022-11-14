import { configureStore } from "@reduxjs/toolkit";
import SignInUpReducer from "./pages/register-login/signInUpSlice.js";
import SystemReducer from "./system-state/systemSlice.js";
import adminReducer from "./pages/admin-profile/AdminProfileSlice";
import categoryReducer from "./pages/category/categorySlice";
import productReducer from "./pages/product/productSlice";
import paymentMethodReducer from "./pages/payment-method/paymentMethodSlice";
import customersReducer from "./pages/customers/customerSlice";
import reviewReducer from "./pages/reviews/reviewSlice";
import orderReducer from "./pages/orders/orderSlice";

const store = configureStore({
  reducer: {
    signInUp: SignInUpReducer,
    system: SystemReducer,
    admin: adminReducer,
    category: categoryReducer,
    productStore: productReducer,
    paymentMethod: paymentMethodReducer,
    customers: customersReducer,
    reviews: reviewReducer,
    orders: orderReducer,
  },
});

export default store;
