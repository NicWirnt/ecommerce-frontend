import React from "react";

import LoginForm from "../../components/login-form/LoginForm";
import { DefaultLayout } from "../layouts/DefaultLayout";

const LoginPage = () => {
  return (
    <DefaultLayout>
      <LoginForm />
    </DefaultLayout>
  );
};

export default LoginPage;
