import { configureStore } from "@reduxjs/toolkit";
import SignInUpReducer from "./pages/register-login/signInUpSlice.js";

const store = configureStore({
  reducer: {
    signInUp: SignInUpReducer,
  },
});

export default store;
