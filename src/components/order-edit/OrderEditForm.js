import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrdersAction } from "../../pages/orders/orderAction";
import { CustomTable } from "../custom-table/CustomTable";

const OrderEditForm = () => {
  const { orders } = useSelector((state) => state.orders);
  const { _id } = useParams();

  const selectedOrder = orders.filter((order) => order._id === _id);

  if (selectedOrder.length < 1) {
    return (
      <h1>Order not Found, please go back and refresh the order list page</h1>
    );
  }

  const order = selectedOrder[0];
  const { buyer, cart, paymentInfo, status, totalAmount } = order;

  return (
    <div>
      <div className="status fw-bold py-2 fs-4 d-flex justify-content-between">
        <div>Status : {status}</div>
        <div>
          <Form className="d-flex">
            <Form.Group>
              <Form.Select>
                <option value="">-- Select --</option>
                <option value="shipped">Shipped</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary"> Mark As</Button>
          </Form>
        </div>
      </div>

      <div className="shippingInfo border p-2 m-2">
        <h4>Buyer Info</h4>
        <hr />
        Order Date: 11-11-2022 <br />
        Name: {buyer.fName} {buyer.lName} <br />
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
        <h4>Cart Details</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Thumbnail</th>
              <th>Name</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => (
              <tr key={i}>
                <td>1</td>
                <td>
                  <img src={item.thumbnail} alt="" width="80px" />
                </td>
                <td>{item.productName}</td>
                <td>{item.salePrice}</td>
                <td>{item.qty}</td>
                <td>{item.subTotal}</td>
              </tr>
            ))}
            <tr className="fw-bold">
              <td colSpan={5}>Total</td>
              <td>{totalAmount}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="note-box border p-2 m-2">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Add Notes</Form.Label>
            <Form.Control as="textArea" placeholder="Add Note" rows="5" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check label="Send Email to customer" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className="note-history border p-2 m-3">
          <h5>Comments</h5>
          <div className="message">
            <div className="note-history mt-3">
              2022-10-10
              <div className="border p-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam
                quibusdam quis accusantium nesciunt! Ad quos consectetur
                mollitia quisquam illo hic, dolor quibusdam culpa magni sed
                beatae, eligendi laborum debitis inventore aliquam eum
                distinctio maiores ducimus id, nam adipisci. Molestias,
                consectetur.
              </div>
            </div>
          </div>
          <div className="message">
            <div className="note-history mt-3">
              2022-10-10
              <div className="border p-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam
                quibusdam quis accusantium nesciunt! Ad quos consectetur
                mollitia quisquam illo hic, dolor quibusdam culpa magni sed
                beatae, eligendi laborum debitis inventore aliquam eum
                distinctio maiores ducimus id, nam adipisci. Molestias,
                consectetur.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderEditForm;
