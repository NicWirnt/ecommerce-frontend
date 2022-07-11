import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CustomInput } from "../../components/custom-input/CustomInput";
import AdminLayout from "../layouts/AdminLayout";
import { updateAdminProfileAction } from "./AdminProfileAction";

const AdminProfile = () => {
  const [form, setForm] = useState({});
  const { user } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    setForm(user);
  }, [user]);

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
      <div className="reset-password">
        <h3>Password Update</h3>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
