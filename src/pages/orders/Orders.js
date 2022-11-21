import React from "react";
import { useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../layouts/AdminLayout";
import Dropdown from "react-bootstrap/Dropdown";
import { getOrdersAction } from "./orderAction";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PaginationBasic } from "../../components/pagination/Pagination";

const productPerPage = 10;

export const Orders = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const { orders } = useSelector((state) => state.orders);
  const [active, setActive] = useState(1);

  useEffect(() => {
    !data.length && dispatch(getOrdersAction());
    setData(orders);
  }, [orders]);

  const handleOnFilter = (e) => {
    const { value } = e.target;
    setActive(1);
    if (!value) {
      setData(orders);
    } else {
      setData(orders.filter((item) => item.status === value));
    }
  };

  // pagination logic
  const handleOnPaginationClick = (page) => {
    setActive(page);
  };
  const pages = Math.ceil(data.length / productPerPage);
  const productStartAt = (active - 1) * productPerPage;
  const productEndAt = productStartAt + 10;

  return (
    <AdminLayout>
      <h4 className="py-3">Order Management</h4>
      <div className="d-flex justify-content-between">
        <div>{data.length} Orders Found!</div>
        <div>
          <Form.Select id="" className="" onChange={handleOnFilter}>
            <option value="">Filter Status</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="cancelled">Cancelled</option>
          </Form.Select>
        </div>
      </div>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Buyer Name</th>
            <th>Order Total</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (item, i) =>
              i >= productStartAt &&
              i < productEndAt && (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.status}</td>
                  <td>
                    {item.buyer.fName} {item.buyer.lName}{" "}
                  </td>
                  <td>{item.totalAmount}</td>
                  <td>{item.paymentInfo.status}</td>
                  <td>
                    <Link to={`/orders/${item._id}`}>Info</Link>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>
      <PaginationBasic
        pages={pages}
        active={active}
        handleOnPaginationClick={handleOnPaginationClick}
      />
    </AdminLayout>
  );
};
