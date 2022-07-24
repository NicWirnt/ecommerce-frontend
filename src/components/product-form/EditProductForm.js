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
  catId: null,
  description: " asjfdlajl fas",
  name: "proudct 1",
  price: 10,
  qty: 10,
  salesEndDate: null,
  salesPrice: 0,
  salesStartDate: null,
  sku: "sdf",
  status: "inactive",
  images: [],
  thumbnail: "",
};

export const EditProductForm = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { selectedProduct } = useSelector((state) => state.productStore);
  const [form, setForm] = useState(initialState);
  const [newImages, setImages] = useState([]);
  const [imgToDelete, setImgToDelete] = useState([]);

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

  const handleOnImageSelect = (e) => {
    const { files } = e.target;
    setImages(files);
  };

  const handleOnImageDelete = (e) => {
    const { checked, name, value } = e.target;
    if (checked) {
      setImgToDelete([...imgToDelete, value]);
    } else {
      setImgToDelete(imgToDelete.filter((imgPath) => imgPath != value));
    }
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

    //bundle in formData
    const formData = new FormData();

    for (const key in rest) {
      formData.append(key, rest[key]);
    }

    newImages.length &&
      [...newImages].map((img) => formData.append("newImages", img));

    formData.append("imgToDelete", imgToDelete);
    dispatch(updateProductAction(formData));
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
    {
      name: "images",
      type: "file",
      multiple: true,
      accept: "image/*",
      required: true,
    },
  ];
  console.log(form);
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
        <CustomInput
          key={i}
          {...item}
          onChange={
            item.name === "images" ? handleOnImageSelect : handleOnChange
          }
        />
      ))}

      <hr />
      <div className="d-flex my-2">
        {selectedProduct.images?.length &&
          selectedProduct.images.map((imgLink) => (
            <div className="img p-1">
              <Form.Check
                type="radio"
                label="Use as Thumbnail"
                name="thumbnail"
                onChange={handleOnChange}
                value={imgLink}
              ></Form.Check>
              <img
                crossOrigin="anonymous"
                key={imgLink}
                src={process.env.REACT_APP_IMAGE_SERVER_URL + imgLink.substr(6)}
                alt="products image"
                width="200px"
                className="img-thumbnail rounded"
              />
              <Form.Check
                label="Delete"
                value={imgLink}
                onChange={handleOnImageDelete}
              ></Form.Check>
            </div>
          ))}
      </div>

      <Button variant="warning" type="submit">
        Update Product
      </Button>
    </Form>
  );
};
