import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../pages/category/categoryAction";
import {
  postProductAction,
  updateProductAction,
} from "../../pages/product/productAction";
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
  //   status: "inactive",
};

export const EditProductForm = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { selectedProduct } = useSelector((state) => state.productStore);
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
    setForm(selectedProduct);
  }, [selectedProduct]);

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

    if (!window.confirm("Are you sure you want to update this product?"))
      return;

    console.log(form);
    const {
      __v,
      updatedAt,
      thumbnail,
      slug,
      sku,
      ratings,
      image,
      createdAt,
      ...rest
    } = form;

    rest.salesPrice = Number(rest.salesPrice) ? +rest.salesPrice : 0;
    rest.salesStartDate = rest.salesStartDate ? rest.salesStartDate : null;
    rest.salesEndDate = rest.salesEndDate ? rest.salesEndDate : null;

    dispatch(updateProductAction(rest));
  };

  const inputFields = [
    {
      name: "name",
      lable: "Name",
      type: "text",
      placeholder: "Product Name",
      required: true,
      value: form.name,
    },
    {
      name: "slug",
      lable: "Slug",
      type: "text",
      placeholder: "Product Name",
      required: true,
      value: form.slug,
      disabled: true,
    },

    {
      name: "sku",
      lable: "SKU",
      type: "text",
      placeholder: "Product uique text",
      required: true,
      value: form.sku,
      disabled: true,
    },
    {
      name: "qty",
      lable: "Qty",
      type: "number",
      placeholder: "50",
      required: true,
      value: form.qty,
    },
    {
      name: "price",
      lable: "Price",
      type: "number",
      placeholder: "100",
      required: true,
      value: form.price,
    },
    {
      name: "salesPrice",
      lable: "Sales Price",
      type: "number",
      placeholder: "80",
      value: form.salesPrice,
    },
    {
      name: "salesStartDate",
      lable: "Sales Start Date",
      type: "date",
      value: form.salesStartDate ? form.salesStartDate.split("T")[0] : "",
    },
    {
      name: "salesEndDate",
      lable: "Sales End Date",
      type: "date",
      value: form.salesEndDate ? form.salesEndDate.split("T")[0] : "",
    },
    {
      name: "description",
      as: "textarea",
      rows: 10,
      required: true,
      value: form.description,
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
          checked={form.status === "active"}
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
                <option
                  key={item._id}
                  value={item._id}
                  selected={item._id === selectedProduct.catId}
                >
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
        Update Product
      </Button>
    </Form>
  );
};
