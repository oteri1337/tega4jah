import React from "react";
import { useHistory } from "react-router-dom";
import { sendFormRequestThenDispatch } from "hooks";
import Form from "components/UncontrolledFormComponent";

function UsersLogInComponent({ email, password }) {
  const history = useHistory();

  const { request, callBack } = sendFormRequestThenDispatch();
  const { fetching, errors } = request;

  const onSuccess = () => {
    history.push("/user/home");
  };

  const callback = async (body) => {
    await callBack("/api/users/auth/signin", "UPDATE_USER", body, onSuccess);
  };

  const initialState = {
    email,
    password,
  };

  return (
    <Form
      {...{
        callback,
        fetching,
        errors,
        text: "SIGN IN",
        initialState,
      }}
    />
  );
}

export default UsersLogInComponent;
