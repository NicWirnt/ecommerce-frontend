import React from "react";
import { CategoryForm } from "../../components/category-form/CategoryForm";
import CategoryTable from "../../components/category-table/CategoryTable";
import AdminLayout from "../layouts/AdminLayout";

const Categories = () => {
  return (
    <AdminLayout>
      {/* form */}
      <CategoryForm />
      <hr />
      {/* table */}
      <CategoryTable />
    </AdminLayout>
  );
};

export default Categories;
