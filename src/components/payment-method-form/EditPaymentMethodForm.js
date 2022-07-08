import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentMethodAction } from "../../pages/payment-method/paymentMethodAction";
import { CustomInput } from "../custom-input/CustomInput";
import { MyVerticallyCenteredModal } from "../modal/Modal";

const initialState = {
  status: "inactive",
  name: "",
  description: "",
};

export const EditPaymentMethodForm = () => {
  const [form, setForm] = useState(initialState);

  const dispatch = useDispatch();
  const { selectedPaymentMethod } = useSelector((state) => state.paymentMethod);

  useEffect(() => {
    setForm(selectedPaymentMethod);
  }, [selectedPaymentMethod]);
  const inputFields = [
    {
      name: "name",
      lable: "Name",
      type: "text",
      placeholder: "Payment Method",
      required: true,
      value: form.name,
    },
    {
      name: "description",
      lable: "Description",
      placeholder: "Descripe the Payment Method here",
      type: "text",
      as: "textarea",
      value: form.description,
    },
  ];

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { createdAt, updatedAt, __v, ...rest } = form;
    console.log(rest);
    dispatch(updatePaymentMethodAction(rest));
  };

  return (
    <MyVerticallyCenteredModal title="Edit Payment Method">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            name="status"
            label="Status"
            onChange={handleOnChange}
            checked={form.status === "active"}
          />
        </Form.Group>
        {inputFields.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}
        <Form.Group className="mb-3">
          <Button variant="success" type="submit">
            Update Payment Method
          </Button>
        </Form.Group>
      </Form>
    </MyVerticallyCenteredModal>
  );
};
