import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { EditProductForm } from "../../components/product-form/EditProductForm";
import { ProductForm } from "../../components/product-form/ProductForm";
// import { ProductForm } from "../../components/product-form/ProductForm";
import AdminLayout from "../layouts/AdminLayout";
import { fetchSingleProductAction } from "./productAction";

export const EditProduct = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();

  useEffect(() => {
    _id && dispatch(fetchSingleProductAction(_id));
  }, [_id]);

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
        <EditProductForm />
      </div>
    </AdminLayout>
  );
};
