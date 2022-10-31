import React from "react";
import RegisterForm from "../../components/register-form/RegisterForm";
import AdminLayout from "../layouts/AdminLayout";

export const RegistrationPage = () => {
  return (
    <AdminLayout>
      <RegisterForm />
    </AdminLayout>
  );
};
