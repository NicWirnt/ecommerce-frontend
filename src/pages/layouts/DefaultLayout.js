import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const DefaultLayout = ({ children }) => {
  return (
    <div>
      {/* Header Section */}
      <Header />

      {/* Main content */}
      <main className="main">{children}</main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};
