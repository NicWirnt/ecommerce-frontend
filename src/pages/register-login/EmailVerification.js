import React, { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { postEmailVerification } from "../../helper/axiosHelper";

const EmailVerification = () => {
  const [queryParams] = useSearchParams();
  const [isPending, setIsPending] = useState(true);
  const [response, setResponse] = useState({});

  useEffect(() => {
    const obj = {
      emailValidationCode: queryParams.get("c"),
      email: queryParams.get("e"),
    };
    (async () => {
      const response = await postEmailVerification(obj);
      setResponse(response);
      setIsPending(false);
      console.log(response);
    })();
  }, []);

  console.log(queryParams.get("c"));
  console.log(queryParams.get("e"));
  return (
    <div className="container d-flex justify-content-center ">
      <div className="verify-email  mt-5 bg-info p-3 rounded">
        <h2>Email Verification Page</h2>
        <hr />
        {isPending && (
          <>
            {" "}
            <Spinner variant="primary" animation="border"></Spinner> Loading...
          </>
        )}

        {response.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}
        {response.message && <Link to="/">Login Now</Link>}
      </div>
    </div>
  );
};

export default EmailVerification;
