import { Button } from "react-bootstrap";
import "./App.css";
import { RegistrationPage } from "./pages/register-login/Registration";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/register-login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="*" element={<h1>404 page not found</h1>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};
export default App;
