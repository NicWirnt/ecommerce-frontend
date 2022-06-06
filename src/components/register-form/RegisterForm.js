import React, { useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import "./registerForm.css";
import { useDispatch, useSelector } from "react-redux";
import { postUserAction } from "../../pages/register-login/signInUpAction";
import { isPending } from "../../pages/register-login/signInUpSlice";

const initialState = {
  fName: "Sam",
  lName: "Smith",
  email: "sam@email.com",
  dob: "2000-02-20",
  password: "123456",
  confirmPassword: "123456",
  phone: "1234567890",
  address: "123 Sydney",
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(false);

  //pull data from redux store
  const { isLoading, response } = useSelector((state) => state.signInUp);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setError(true);
    }
    setError(false);

    const { confirmPassword, ...rest } = form;

    dispatch(postUserAction(rest));
  };

  return (
    <Container>
      <div className="form-content mt-5 mb-5">
        <h1>Registration Page</h1>
        <hr />
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First Name </Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="fName"
              value={form.fName}
              placeholder="Enter your first name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last Name </Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="lName"
              value={form.lName}
              placeholder="Enter your last name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone Number </Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="phone"
              value={form.phone}
              placeholder="Enter your phone number"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>DOB </Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="dob"
              value={form.dob}
              type="date"
              placeholder="2020-02-20"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address </Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="address"
              value={form.address}
              placeholder="Enter your address"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email </Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="email"
              value={form.email}
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="password"
              value={form.password}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="confirmPassword"
              value={form.confirmPassword}
              type="password"
              placeholder="Confirm Password"
              required
            />
            <Alert variant="danger" show={error}>
              Confirm password do not match
            </Alert>
          </Form.Group>
          <Form.Group>
            {response.message && (
              <Alert
                variant={response.status === "success" ? "success" : "danger"}
              >
                {response.message}
              </Alert>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            {isLoading ? (
              <Spinner variant="primary" animation="border" size="sm"></Spinner>
            ) : (
              "  Sign up"
            )}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterForm;
