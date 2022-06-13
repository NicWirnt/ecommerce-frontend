import { configureStore } from "@reduxjs/toolkit";
import SignInUpReducer from "./pages/register-login/signInUpSlice.js";
import SystemReducer from "./system-state/systemSlice.js";

const store = configureStore({
  reducer: {
    signInUp: SignInUpReducer,
    system: SystemReducer,
  },
});

export default store;
