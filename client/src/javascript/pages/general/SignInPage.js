import React from "react";
import { Link } from "react-router-dom";
import { sendFormRequestThenDispatch } from "hooks";
import Form from "components/UncontrolledFormComponent";

function SignInPage({ location }) {
  const params = new URLSearchParams(location.search);
  const email = params.get("email") ?? "";
  const password = params.get("password") ?? "";

  const {  request, callBack } = sendFormRequestThenDispatch();
  const { fetching, errors } = request;

  const formObjects = [
    {
      id: "email",
      type: "email",
    },
    {
      id: "password",
      type: "password",
    },
  ];

  const callback = async (body) => {
    await callBack("/api/users/auth/signin", "UPDATE_USER", body);
  };

  const initialState = {
    email,
    password,
  };

  return (
    <div className=" row" style={{ minHeight: "100vh" }}>
      <br />
      <div className="col l4 offset-l4 s12">
        <div className="container">
          <br />
          <center>
            <img
              src="/assets/images/pwa/android-chrome-144x144.png"
              className="responsive-img"
            />
          </center>
          <br />
          <div className="card-panel" style={{ borderRadius: "10px" }}>
            <center>
              <br />
              <Form
                {...{
                  formObjects,
                  callback,
                  fetching,
                  errors,
                  text: "Sign In",
                  initialState,
                }}
              />
              <br />
              <p>
                <Link to="/password">Forgot Password?</Link>
              </p>

              <p>
                Dont have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
