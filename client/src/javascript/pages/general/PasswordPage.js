import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";

function PasswordPage({ location }) {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const params = new URLSearchParams(location.search);

  const nav = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Reset Password",
    },
  ];

  const renderForm = () => {
    if (sent) {
      const formArray = [
        {
          id: "new_password",
          type: "password",
        },
        {
          id: "confirm_new_password",
          type: "password",
        },
        {
          id: "password_token",
          label: "token",
        },
      ];

      const onSubmit = (body) => {
        body.email = email;
        callBack(
          "/api/users/auth/update/password-guest",
          "N",
          body,
          null,
          "PATCH"
        );
      };

      const text = "Update";

      return (
        <div>
          <p>
            please enter your new password and the token sent to your email{" "}
            <b>{email}</b>
          </p>
          <br />
          <Form {...{ fetching, errors, message, formArray, onSubmit, text }} />
        </div>
      );
    }

    const formArray = [
      {
        id: "email",
        type: "email",
      },
    ];

    const onSuccess = () => {
      setSent(true);
    };

    const onSubmit = (b) => {
      setEmail(b.email);
      callBack("/api/users/auth/send-pin", "N", b, onSuccess);
    };

    return (
      <div>
        <p>please enter the email address attached to your account below</p>

        <Form {...{ formArray, fetching, errors, message, onSubmit }} />
      </div>
    );
  };

  return (
      <div className="row app-py-0 ">
        <div className="col s12 m12 l4 offset-l4">
          <br />
          <br />
          <div className="card-panel">
            <center>
              <br />
              {renderForm()}
              <br />
            </center>
          </div>
        </div>
      </div>
  );
}

export default PasswordPage;