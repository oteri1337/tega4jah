import React from "react";
import FormComponent from "components/FormComponent";
import { sendRequestThenDispatch, useFetch } from "hooks";
import VerificationSkipComponent from "./VerificationSkipComponent";

function ResendPinComponent() {
  const { state, fetching, request, response } = useFetch();
  const { errors, message } = response;

  const text = "RESEND PIN";

  const formArray = [
    {
      id: "email",
      type: "email",
    },
  ];

  const initialState = {
    email: state.user.email,
  };

  const onSubmit = (body) => {
    const method = "PATCH";
    const dispatch = "UPDATE_USER";
    const endpoint = "/api/users/auth/update/email";
    request({ endpoint, dispatch, method, body });
  };

  return (
    <FormComponent
      {...{
        text,
        errors,
        message,
        fetching,
        onSubmit,
        formArray,
        initialState,
      }}
    />
  );
}

function EmailVerificationPage({ history }) {
  const { callBack, request } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const formArray = [
    {
      id: "pin",
      type: "number",
    },
  ];

  const text = "VERIFY EMAIL";

  const onSubmit = ({ pin }) => {
    const body = { pin: parseInt(pin) };
    callBack("/api/users/auth/verify-email", "UPDATE_USER", body);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className=" row">
        <div className="col l4 s12 offset-l4">
          <br />

          <div className="card-panel" style={{ borderRadius: "10px" }}>
            <div className="container">
              <center>
                <h3 className="btn-color">Email Verification</h3>
                <br />

                <p>
                  An email containing your 5-digit PIN has been sent to your
                  email If you have not received it in a minute or two, click
                  ‘Resend’.
                </p>
                <br />

                <FormComponent
                  {...{
                    text,
                    errors,
                    message,
                    onSubmit,
                    fetching,
                    formArray,
                  }}
                />

                <br />
                <br />

                <ResendPinComponent />

                <br />
                <br />

                <VerificationSkipComponent type="email" />
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerificationPage;
