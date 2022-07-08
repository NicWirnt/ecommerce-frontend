import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../pages/category/categoryAction";
import { postProductAction } from "../../pages/product/productAction";
import { CustomInput } from "../custom-input/CustomInput";

const initialState = {
  //   catId: null,
  //   description: " asjfdlajl fas",
  //   name: "proudct 1",
  //   price: 10,
  //   qty: 10,
  //   salesEndDate: null,
  //   salesPrice: 0,
  //   salesStartDate: null,
  //   sku: "sdf",
  status: "inactive",
};

export const ProductForm = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);

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
    console.log(form);
    dispatch(postProductAction(form));
  };

  const inputFields = [
    {
      name: "name",
      lable: "Name",
      type: "text",
      placeholder: "Product Name",
      required: true,
    },

    {
      name: "sku",
      lable: "SKU",
      type: "text",
      placeholder: "Product uique text",
      required: true,
    },
    {
      name: "qty",
      lable: "Qty",
      type: "number",
      placeholder: "000",
      required: true,
    },
    {
      name: "price",
      lable: "Price",
      type: "number",
      placeholder: "$$$",
      required: true,
    },
    {
      name: "salesPrice",
      lable: "Sales Price",
      type: "number",
      placeholder: "$$$",
    },
    {
      name: "salesStartDate",
      lable: "Sales Start Date",
      type: "date",
    },
    {
      name: "salesEndDate",
      lable: "Sales End Date",
      type: "date",
    },
    {
      name: "description",
      as: "textarea",
      rows: 10,
      required: true,
    },
  ];

  return (
    <Form className="mb-5" onSubmit={handleOnSubmit}>
      <Form.Group className="mb-3">
        <Form.Check
          name="status"
          onChange={handleOnChange}
          type="switch"
          id="custom-switch"
          label="Status"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Select
          name="catId"
          defaultValue="Choose..."
          onChange={handleOnChange}
          required
        >
          <option value="">.. Select parent Category ..</option>
          {categories.map(
            (item) =>
              !item.parentCatId && (
                <option key={item._id} value={item._id}>
                  {item.catName}
                </option>
              )
          )}
        </Form.Select>
      </Form.Group>

      {inputFields.map((item, i) => (
        <CustomInput key={i} {...item} onChange={handleOnChange} />
      ))}

      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
};
