import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleSidebar } from "../../system-state/systemSlice";

export const AdminSidebar = () => {
  const dispatch = useDispatch();
  const { showAdminSideBar } = useSelector((state) => state.system);

  return (
    <>
      {/* <Button variant="primary">
        <i class="fa-solid fa-bars"></i>
      </Button> */}

      <Offcanvas
        show={showAdminSideBar}
        onHide={() => dispatch(toggleSidebar())}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Side Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <hr />
          <ListGroup variant="flush" className="">
            <ListGroup.Item>
              <Link className="nav-link" to="/dashboard">
                <i className="fa-solid fa-house-user"></i> Home
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/dashboard">
                <i className="fa-solid fa-gauge"></i> Dashboard
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/customers">
                <i className="fa-solid fa-person"></i> Customers
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/orders">
                <i className="fa-solid fa-cart-shopping"></i> Orders
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/products">
                <i className="fa-solid fa-table-cells"></i> Products
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/categories">
                <i className="fa-solid fa-check-to-slot"></i> Categories
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/payments">
                <i className="fa-solid fa-money-check"></i> Payments
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/settings">
                <i className="fa-solid fa-screwdriver-wrench"></i> Settings
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/">
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
