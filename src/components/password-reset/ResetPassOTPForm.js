import React, { useRef, useEffect } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import "./resetPassForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  requestPassResetOTPAction,
  resetPassAction,
} from "../../pages/admin-profile/AdminProfileAction";
import { useState } from "react";

const initialState = {
  otp: "",
  password: "",
  confirmPassword: "",
};

const ResetPassOTPForm = () => {
  const dispatch = useDispatch();
  // const nav = useNavigate();

  // const [form, setForm] = useState(initialState);
  //pull data from redux store
  // const { isLoading } = useSelector((state) => state.signInUp);
  const { passResetResponse, isLoading, passResettingEmail } = useSelector(
    (state) => state.admin
  );

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setError("");
    !disableButton && setDisableButton(true);

    setForm({
      ...form,
      [name]: value,
    });

    // if (name === "password") {
    //   const { password } = form;
    //   password.length < 6 && setError("Password must be at least 6 character");

    //   !/[a-z]/.test(password) && setError("Password must contain lowercase");
    //   !/[A-Z]/.test(password) && setError("Password must contain uppercase");
    //   !/[0-9]/.test(password) && setError("Password must contain number");
    // }

    if (name === "confirmPassword") {
      const { password } = form;
      password !== value && setError("Password do not match");
      password.length < 6 && setError("Password must be at least 6 character");

      !/[a-z]/.test(password) && setError("Password must contain lowercase");
      !/[A-Z]/.test(password) && setError("Password must contain uppercase");
      !/[0-9]/.test(password) && setError("Password must contain number");
      !form.password && setError("New password must be provided");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      return alert("Password do not match");
    }
    rest.email = passResettingEmail;
    dispatch(resetPassAction(rest));
    console.log(form);
  };

  const toDIsableButton = () => {
    !error && setDisableButton(false);
  };

  // 123Abc
  return (
    <Container>
      <div className="form-content mt-5 mb-5">
        <h1>Reset Password</h1>
        <hr />
        {isLoading && <Spinner variant="primary" animation="border" />}
        {passResetResponse.message && (
          <Alert
            variant={
              passResetResponse.status === "success" ? "success" : "danger"
            }
          >
            {passResetResponse.message}
          </Alert>
        )}
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>OTP </Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="otp"
              type="number"
              placeholder="Enter your OTP"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label>New Password </Form.Label>
            <Form.Control
              autoComplete=""
              onChange={handleOnChange}
              name="password"
              type="password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              autoComplete=""
              onChange={handleOnChange}
              name="confirmPassword"
              type="password"
              onBlur={toDIsableButton}
            />
            <Form.Text>
              Password must contain Uppercase, Lowercase, Number and at least 6
              character long
            </Form.Text>
          </Form.Group>
          <div className="text-danger fw-bold mb-3">{error}</div>
          {/* handled by toaster */}
          {/* <Form.Group>
            {response.message && (
              <Alert
                variant={response.status === "success" ? "success" : "danger"}
              >
                {response.message}
              </Alert>
            )}
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Button variant="primary" type="submit" disabled={disableButton}>
              Update Password
            </Button>
          </Form.Group>
        </Form>
        <div className="text-end">
          Have an account?
          <a href="/login">Login</a> Now ...
        </div>
      </div>
    </Container>
  );
};

export default ResetPassOTPForm;
