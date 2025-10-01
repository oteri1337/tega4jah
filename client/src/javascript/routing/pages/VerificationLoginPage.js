import React from "react";
import FormComponent from "components/FormComponent";
import { sendRequestThenDispatch, useFetch } from "hooks";

function ResendPinComponent() {
  const { state, fetching, request, response } = useFetch();
  const { errors, message } = response;

  const text = "RESEND PIN";

  const initialState = {
    email: state.user.email,
  };

  const onSubmit = (body) => {
    const method = "POST";

    const dispatch = "";

    const endpoint = "/api/users/auth/send-pin";

    request({ endpoint, dispatch, method, body });
  };

  const className = "btn btn-secondary";

  return (
    <FormComponent
      {...{
        text,
        errors,
        message,
        fetching,
        onSubmit,
        className,
        initialState,
      }}
    />
  );
}

function VerificationLoginPage() {
  const { callBack, request, state } = sendRequestThenDispatch();
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
          <br />

          <div className="card-panel" style={{ borderRadius: "10px" }}>
            <div className="container">
              <center>
                <h3 className="btn-color">Two Factor Authentication</h3>
                <br />

                <p>
                  An email containing your PIN is has been sent to your email{" "}
                  <b>{state.user.email}</b> If you have not received it in a
                  minute or two, click ‘Resend’.
                </p>
                <br />

                <FormComponent
                  {...{
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
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationLoginPage;
