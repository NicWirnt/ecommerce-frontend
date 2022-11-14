import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrdersAction } from "../../pages/orders/orderAction";
import { CustomTable } from "../custom-table/CustomTable";

const OrderEditForm = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);
  const { _id } = useParams();

  const selectedOrder = orders.filter((order) => order._id === _id);

  if (selectedOrder.length < 1) {
    return (
      <h1>Order not Found, please go back and refresh the order list page</h1>
    );
  }

  const order = selectedOrder[0];
  const { buyer, cart, paymentInfo, status } = order;

  return (
    <div>
      <div className="status fw-bold py-2 fs-4">Status : {status}</div>

      <div className="shippingInfo border p-2 m-2">
        <h4>Buyer Info</h4>
        <hr />
        Order Date: 11-11-2022 Name: {buyer.fName} {buyer.lName} <br />
        Phone: {buyer.phone} <br />
        Email: {buyer.email} <br />
        Shipping Address: {buyer.address}
      </div>
      <div className="payment-details border p-2 m-2">
        <h4>Payment Details</h4>
        <hr />
        Status: {paymentInfo.status} <br />
        Total: {order.totalAmount} <br />
        Paid Date: {paymentInfo.paidDate} <br />
        Payment Method: {paymentInfo.method} <br />
        Transaction ID: {paymentInfo.transactionId}
      </div>
      <div className="order-details border p-2 m-2">
        <CustomTable />
      </div>
      <div className="note-box border p-2 m-2">Form Here</div>
      <div className="note-history border p-2 m-2">Message History Here</div>
    </div>
  );
};

export default OrderEditForm;
