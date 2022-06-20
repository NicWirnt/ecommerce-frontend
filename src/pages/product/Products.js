import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductTable from "../../components/product-table/ProductTable";

import AdminLayout from "../layouts/AdminLayout";

export const Products = () => {
  return (
    <AdminLayout>
      <h3>Products</h3>
      <div className="text-end">
        <Link to="/product/new">
          <Button variant="primary">
            <i className="fa-solid fa-circle-plus"></i> Add new Product
          </Button>
        </Link>
      </div>
      <div className="product-list">
        <ProductTable />
      </div>
    </AdminLayout>
  );
};
