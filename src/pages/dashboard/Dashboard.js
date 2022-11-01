import React from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CustomCard } from "../../components/custom-card/CustomCard";
import { CustomTable } from "../../components/custom-table/CustomTable";
import AdminLayout from "../layouts/AdminLayout";
import { fetchProductAction } from "../product/productAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productStore);
  useEffect(() => {
    !products.length && dispatch(fetchProductAction());
  }, []);

  //client info
  const clientHeader = ["First Name", "Last Name", "Joined Date"];
  const clientInfo = [
    {
      fName: "Nico",
      lName: "Wira",
      joinDate: "30-08-2020",
    },
    {
      fName: "Feb",
      lName: "Aug",
      joinDate: "12-04-2020",
    },
    {
      fName: "Heir",
      lName: "Char",
      joinDate: "6-02-2020",
    },
  ];

  //Order Info
  const tableHeader = [
    "Status",
    "First Name",
    "Last Name",
    "Order Date",
    "Order Total",
  ];
  const tableData = [
    {
      status: "Processing",
      fName: "Sam",
      lName: "Smith",
      orderDate: "23-12-2022",
      orderTotal: 450,
    },
    {
      status: "Payment Pending",
      fName: "Nico",
      lName: "Wira",
      orderDate: "18-12-2022",
      orderTotal: 450,
    },
    {
      status: "Shipped",
      fName: "Sarah",
      lName: "Nugget",
      orderDate: "23-12-2022",
      orderTotal: 450,
    },
    {
      status: "Processing",
      fName: "Rachel",
      lName: "Wesley",
      orderDate: "23-12-2022",
      orderTotal: 450,
    },
  ];

  const activeProduct = products.filter(
    (product) => product.status === "active"
  );
  const inactiveProduct = products.filter(
    (product) => product.status === "inactive"
  );
  return (
    <AdminLayout>
      <h4 className="py-3">Dashboard</h4>
      <div className="products">
        <h5>Product Summary</h5>
        <hr />
        <Row>
          <Col md="4">
            {" "}
            <CustomCard title="Total Products" count={products.length} />
          </Col>
          <Col md="4">
            {" "}
            <CustomCard title="Active Products" count={activeProduct.length} />
          </Col>
          <Col md="4">
            {" "}
            <CustomCard
              title="Inactive Products"
              count={inactiveProduct.length}
            />
          </Col>
        </Row>
      </div>

      <div className="user-info mt-5 mb-5">
        <h5>Clients Summary</h5>
        <hr />
        {/* {clientHeader.map((item, i) => (
          <CustomTable tableHeader={item} />
        ))} */}

        <CustomTable tableHeader={clientHeader} tableData={clientInfo} />
      </div>

      <div className="last-orders">
        <h5>Last 5 Orders</h5>
        <hr />
        <CustomTable tableHeader={tableHeader} tableData={tableData} />
      </div>

      <div className="top-selling"></div>
    </AdminLayout>
  );
};

export default Dashboard;
