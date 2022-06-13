import React from "react";
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
      <main className="main">{children}</main>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
