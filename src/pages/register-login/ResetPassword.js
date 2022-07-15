import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ResetPassForm from "../../components/password-reset/ResetPassForm";
import ResetPassOTPForm from "../../components/password-reset/ResetPassOTPForm";
import { DefaultLayout } from "../layouts/DefaultLayout";

const ResetPassword = () => {
  const { showForm } = useSelector((state) => state.admin);
  const form = {
    otp: <ResetPassForm />,
    password: <ResetPassOTPForm />,
  };

  return <DefaultLayout>{form[showForm]}</DefaultLayout>;
};

export default ResetPassword;
