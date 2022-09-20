import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CustomInput } from "../../components/custom-input/CustomInput";
import AdminLayout from "../layouts/AdminLayout";
import {
  updateAdminProfileAction,
  updatePassAction,
} from "./AdminProfileAction";

const passInitialState = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};

const AdminProfile = () => {
  const [form, setForm] = useState({});
  const [passUpdateForm, setPassUpdateForm] = useState(passInitialState);
  const [error, setError] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const { user } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    setForm(user);
  }, [user]);

  //Profile update
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { createdAt, emailValidationCode, updatedAt, __v, status, ...rest } =
      form;
    dispatch(updateAdminProfileAction(rest));
  };

  const inputField = [
    {
      lable: "First Name",
      name: "fName",
      type: "text",
      value: form.fName,
      required: true,
    },
    {
      lable: "Last Name",
      name: "lName",
      type: "text",
      value: form.lName,
      required: true,
    },
    {
      lable: "Email",
      name: "email",
      type: "email",
      value: form.email,
      required: true,
      disabled: true,
    },

    {
      lable: "Phone",
      name: "phone",
      type: "text",
      value: form.phone,
    },
    {
      lable: "Address",
      name: "address",
      type: "text",
      value: form.address,
    },
    {
      lable: "DoB",
      name: "dob",
      type: "date",
      value: form.dob ? form.dob.substr(0, 10) : undefined,
    },
    {
      lable: "Current Password                                     ",
      name: "password",
      type: "password",
      required: true,
    },
  ];

  //Password Update
  const handleOnPasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "password" || "confirmPassword") {
      setError("");
      !disableButton && setDisableButton(true);
    }

    setPassUpdateForm({
      ...passUpdateForm,
      [name]: value,
    });

    if (name === "confirmPassword") {
      const { password } = passUpdateForm;
      password !== value && setError("Password do not match");
      password.length < 6 && setError("Password must be at least 6 character");

      !/[a-z]/.test(password) && setError("Password must contain lowercase");
      !/[A-Z]/.test(password) && setError("Password must contain uppercase");
      !/[0-9]/.test(password) && setError("Password must contain number");
      !passUpdateForm.password && setError("New password must be provided");
    }
  };

  const handleOnPasswordSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, password, currentPassword } = passUpdateForm;
    if (confirmPassword !== password) {
      return alert("Password do not match");
    }
    const obj = {
      password,
      email: user.email,
      currentPassword,
    };
    dispatch(updatePassAction(obj));
  };

  const toDisableButton = () => {
    !error && setDisableButton(false);
  };

  const resetPassFields = [
    {
      lable: "Current Password",
      name: "currentPassword",
      type: "password",
      value: passUpdateForm.currentPassword,
      required: true,
    },
    {
      lable: "New Password",
      name: "password",
      type: "password",
      value: passUpdateForm.password,
      required: true,
    },
    {
      lable: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      value: passUpdateForm.confirmPassword,
      required: true,
      onBlur: toDisableButton,
    },
  ];

  return (
    <AdminLayout>
      <div className="update-info mt-3">
        <h3>Your Profile</h3>

        <Form onSubmit={handleOnSubmit}>
          {inputField.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}

          <Button type="submit"> Update Profile</Button>
        </Form>
      </div>
      <hr />
      <div className="reset-password mb-3">
        <h3>Password Update</h3>
        <Form onSubmit={handleOnPasswordSubmit}>
          {resetPassFields.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnPasswordChange} />
          ))}
          <Form.Group className="mb-3">
            <Form.Text>
              Password must contain Uppercase, Lowercase, Number and at least 6
              character long
            </Form.Text>
            <div className="text-danger fw-bold mb-3">{error}</div>
          </Form.Group>
          <Button type="submit" disabled={disableButton}>
            {" "}
            Update Password
          </Button>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
