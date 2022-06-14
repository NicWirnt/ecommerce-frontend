import React from "react";
import { Container } from "react-bootstrap";
import { AdminSidebar } from "../../components/admin-sidebar/AdminSidebar";
import { Footer } from "./Footer";
import { Header } from "./Header";

const AdminLayout = ({ children }) => {
  return (
    <div>
      {" "}
      {/* Header Section */}
      <Header />
      {/* Main content */}
      <AdminSidebar />
      <Container>
        <main className="main">{children}</main>
      </Container>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
