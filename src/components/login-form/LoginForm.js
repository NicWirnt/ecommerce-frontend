import React, { useRef, useEffect } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import "./loginForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  postLoginAction,
  postUserAction,
} from "../../pages/register-login/signInUpAction";
import { isPending } from "../../pages/register-login/signInUpSlice";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();

  const origin =
    (location.state && location.state.from && location.state.from.pathname) ||
    "/dashboard";

  // const [form, setForm] = useState(initialState);
  //pull data from redux store
  const { isLoading } = useSelector((state) => state.signInUp);
  const { user } = useSelector((state) => state.admin);

  const emailRef = useRef();
  const passRef = useRef();

  useEffect(() => {
    user._id && nav(origin);
  }, [user]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (!email || !password) {
      alert("Both email and password must be filled");
    }

    //call api, through action
    dispatch(postLoginAction({ email, password }));
  };

  return (
    <Container>
      <div className="form-content mt-5 mb-5">
        <h1>Welcome Back!</h1>
        <hr />
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={passRef}
              name="password"
              type="password"
              placeholder="Password"
              autoComplete=""
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

          <Button variant="primary" type="submit">
            {isLoading ? (
              <Spinner variant="primary" animation="border" size="sm"></Spinner>
            ) : (
              "  Login"
            )}
          </Button>
        </Form>
        <div className="text-end">
          Forget Password?
          <a href="/forget-password">Reset Password</a> Now ...
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;
