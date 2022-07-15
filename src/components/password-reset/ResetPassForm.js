import React, { useRef, useEffect } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import "./resetPassForm.css";
import { useDispatch, useSelector } from "react-redux";
import { requestPassResetOTPAction } from "../../pages/admin-profile/AdminProfileAction";

const ResetPassForm = () => {
  const dispatch = useDispatch();
  // const nav = useNavigate();

  // const [form, setForm] = useState(initialState);
  //pull data from redux store
  // const { isLoading } = useSelector((state) => state.signInUp);
  const { passResetResponse, isLoading } = useSelector((state) => state.admin);

  const emailRef = useRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    console.log(email);
    dispatch(requestPassResetOTPAction({ email }));
  };

  return (
    <Container>
      <div className="form-content mt-5 mb-5">
        <h1>Request your password change!</h1>
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
            <Form.Label>Email </Form.Label>
            <Form.Control
              ref={emailRef}
              name="email"
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

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
            <Button variant="primary" type="submit">
              Request OTP
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

export default ResetPassForm;
