import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form, Pagination, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CustomTable } from "../../components/custom-table/CustomTable";
import { PaginationBasic } from "../../components/pagination/Pagination";
import AdminLayout from "../layouts/AdminLayout";
import { getCustomersAction } from "./customerAction";

const customerPerPage = 5;
export const Customers = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const [displayCustomer, setDisplayCustomer] = useState([]);
  const [searchName, setSearchName] = useState(false);
  const [searchPhone, setSearchPhone] = useState(false);

  const [active, setActive] = useState(1);
  const { customers } = useSelector((state) => state.customers);

  useEffect(() => {
    !displayCustomer.length && dispatch(getCustomersAction(_id));
    setDisplayCustomer(customers);
  }, [customers]);

  const handleOnSearchName = (e) => {
    const { value } = e.target;

    if (!value) {
      setDisplayCustomer(customers);
      setSearchName(false);
    } else {
      setSearchName(true);
      if (searchPhone) {
        setDisplayCustomer(
          displayCustomer.filter((item, i) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
        );
      } else {
        setDisplayCustomer(
          customers.filter((item, i) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
        );
      }
    }
  };

  const handleOnSearchPhone = (e) => {
    const { value } = e.target;

    if (!value) {
      setDisplayCustomer(customers);
      setSearchPhone(false);
    } else {
      setSearchPhone(true);
      if (searchName) {
        setDisplayCustomer(
          displayCustomer.filter((item, i) => item.phone.includes(value))
        );
      } else {
        setDisplayCustomer(
          customers.filter((item, i) => item.phone.includes(value))
        );
      }
    }
  };

  const handleOnClear = () => {
    document.getElementById("input");
  };

  const handleOnPaginationClick = (pages) => {
    setActive(pages);
  };

  const pages = Math.ceil(displayCustomer.length / customerPerPage);
  const customerStartAt = (active - 1) * customerPerPage;
  const customerEndAt = customerStartAt + 5;

  return (
    <AdminLayout>
      <h4 className="py-3">Customer Management</h4>
      <div className="mb-3 d-flex justify-content-between ">
        <Form.Control
          id="input"
          className="m-2"
          type="text"
          placeholder="Search Customer by Name"
          onChange={handleOnSearchName}
        />
        <Form.Control
          id="input"
          className="m-2"
          type="text"
          placeholder="Search Customer by Phone Number"
          onChange={handleOnSearchPhone}
        />
        <Button className="m-2">Clear</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayCustomer.map(
            (item, i) =>
              i >= customerStartAt &&
              i < customerEndAt && (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Button variant="link">Info</Button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>
      <PaginationBasic
        pages={pages}
        handleOnPaginationClick={handleOnPaginationClick}
        active={active}
      />
    </AdminLayout>
  );
};
