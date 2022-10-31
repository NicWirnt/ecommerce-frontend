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
import { EditProduct } from "./pages/product/EditProduct";
import { PaymentMethod } from "./pages/payment-method/PaymentMethod";
import ResetPassword from "./pages/register-login/ResetPassword";
import PrivateRoute from "./components/private-route/PrivateRoute";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          {/* PRIVATE ROUTE */}

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-profile"
            element={
              <PrivateRoute>
                <AdminProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />

          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/new"
            element={
              <PrivateRoute>
                <NewProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/edit/:_id"
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <PrivateRoute>
                <PaymentMethod />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <RegistrationPage />
              </PrivateRoute>
            }
          />

          {/* public routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/forget-password" element={<ResetPassword />} />

          <Route path="/admin/verify-email" element={<EmailVerification />} />

          <Route path="*" element={<h1>404 page not found</h1>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};
export default App;
