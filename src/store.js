import { configureStore } from "@reduxjs/toolkit";
import SignInUpReducer from "./pages/register-login/signInUpSlice.js";

const store = configureStore({
  reducer: {
    SignInUp: SignInUpReducer,
  },
});

export default store;
