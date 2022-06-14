import { configureStore } from "@reduxjs/toolkit";
import SignInUpReducer from "./pages/register-login/signInUpSlice.js";
import SystemReducer from "./system-state/systemSlice.js";
import adminReducer from "./pages/admin-profile/AdminProfileSlice";

const store = configureStore({
  reducer: {
    signInUp: SignInUpReducer,
    system: SystemReducer,
    admin: adminReducer,
  },
});

export default store;
