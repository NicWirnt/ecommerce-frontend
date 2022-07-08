import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductForm } from "../../components/product-form/ProductForm";
// import { ProductForm } from "../../components/product-form/ProductForm";
import AdminLayout from "../layouts/AdminLayout";

export const NewProduct = () => {
  return (
    <AdminLayout>
      <h3>Add Product</h3>
      <div className="mt-3 mb-3">
        <Link to="/products">
          <Button variant="none">
            <i className="fa-solid fa-chevron-left"></i> Back
          </Button>
        </Link>
      </div>
      <div className="">
        <ProductForm />
      </div>
    </AdminLayout>
  );
};
