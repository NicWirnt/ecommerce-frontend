import { Button } from "react-bootstrap";
import "./App.css";
import { RegistrationPage } from "./pages/register-login/Registration";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/register-login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailVerification from "./pages/register-login/EmailVerification";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminProfile from "./pages/admin-profile/AdminProfile";
import Categories from "./pages/category/Categories";
import { Products } from "./pages/product/Products";
import { NewProduct } from "./pages/product/NewProduct";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          {/* PRIVATE ROUTE */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/categories" element={<Categories />} />

          <Route path="/products" element={<Products />} />
          <Route path="/product/new" element={<NewProduct />} />

          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/admin/verify-email" element={<EmailVerification />} />

          <Route path="*" element={<h1>404 page not found</h1>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};
export default App;
