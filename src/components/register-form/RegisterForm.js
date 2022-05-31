import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import "./registerForm.css";

const RegisterForm = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = form;

    password === confirmPassword ? setError(false) : setError(true);
    console.log(form);
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
              placeholder="Enter your first name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last Name </Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="lName"
              placeholder="Enter your last name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>DOB </Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="dob"
              type="date"
              placeholder="2020-02-20"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address </Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="address"
              placeholder="Enter your address"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email </Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="email"
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
              type="password"
              placeholder="Confirm Password"
              required
            />
            <Alert variant="danger" show={error}>
              Confirm password do not match
            </Alert>
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign up
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterForm;
