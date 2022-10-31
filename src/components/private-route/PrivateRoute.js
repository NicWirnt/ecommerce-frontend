import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authoAdminLogin } from "../../pages/register-login/signInUpAction";

export const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => state.admin);

  return user._id ? children : <Navigate to="/" />;
};

export default PrivateRoute;
