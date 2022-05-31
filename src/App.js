import { Button } from "react-bootstrap";
import "./App.css";
import { Registration } from "./pages/register-login/Registration";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="*" element={<h1>404 page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
