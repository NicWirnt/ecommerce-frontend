import React from "react";
import RegisterForm from "../../components/register-form/RegisterForm";
import { DefaultLayout } from "../layouts/DefaultLayout";

export const RegistrationPage = () => {
  return (
    <DefaultLayout>
      <RegisterForm />
    </DefaultLayout>
  );
};
