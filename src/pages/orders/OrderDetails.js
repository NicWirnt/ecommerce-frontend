import React from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../layouts/AdminLayout";

import { getOrdersAction } from "./orderAction";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import OrderEditForm from "../../components/order-edit/OrderEditForm";

export const OrderDetail = () => {
  return (
    <AdminLayout>
      <div className="mt-3 fs-4">
        <Link
          to="/orders"
          className="text-decoration-none text-secondary"
          variant="link"
        >
          &lt; Back
        </Link>
      </div>

      <h4 className="py-3">Order Detail</h4>

      <OrderEditForm />
    </AdminLayout>
  );
};
