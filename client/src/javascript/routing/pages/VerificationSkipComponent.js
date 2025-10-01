import React from "react";
import { useHistory } from "react-router-dom";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";

function VerificationSkipComponent({ type }) {
  const history = useHistory();
  const { state, request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const text = "SKIP";
  const user = state.user;
  const settings = state.settings.data[0];
  const className = "btn btn-secondary btn-full";

  const onSubmit = async () => {
    let body = {};

    if (type == "id") {
      body = { id_verification: "Skipped" };
    }

    if (type == "email") {
      body = { email_verification: "Skipped" };
    }

    if (type == "address") {
      body = { address_verification: "Skipped" };
    }

    // prettier-ignore
    await callBack("/api/users/update/user","UPDATE_USER", body, null, "PATCH");
    history.push("/user/index.html");
  };

  // prettier-ignore
  if (type == "id" && settings.id_verification != "required" && user.id_verification != "Skipped") {
    return (<FormComponent {...{ fetching, errors, message, text, className, onSubmit }} />);
  }

  // prettier-ignore
  if (type == "email" && settings.email_verification != "required" && user.email_verification != "Skipped") {
    return (<FormComponent {...{ fetching, errors, message, text, className, onSubmit }} />);
  }

  // prettier-ignore
  if (type == "address" && settings.address_verification != "required" && user.address_verification != "Skipped") {
    return (<FormComponent {...{ fetching, errors, message, text, className, onSubmit }} />);
  }

  return <></>;
}

export default VerificationSkipComponent;
