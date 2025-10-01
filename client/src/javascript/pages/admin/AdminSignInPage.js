import React from "react";
import { sendFormRequestThenDispatch } from "hooks";
import UncontrolledFormComponent from "components/UncontrolledFormComponent";

function AdminSigninPage({ location }) {
  const params = new URLSearchParams(location.search);
  const email = params.get("email") ?? "";
  const password = params.get("password") ?? "";

  React.useEffect(() => {
    document.title = "Admin Sign In - ProBrokerApis";
  });

  const initialState = {
    email,
    password,
  };

  const { request, callBack } = sendFormRequestThenDispatch();

  const formArray = [
    {
      id: "email",
      type: "email",
    },
    {
      id: "password",
      type: "password",
    },
  ];

  const callback = (body) => {
    callBack("/api/admins/auth/signin", "UPDATE_ADMIN", body);
  };

  return (
    <div className="row container">
      <div className="col s12 l4 offset-l4">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2 className="center">Admin Sign In</h2>
        <br />
        <br />
        <div className="card-panel">
          <UncontrolledFormComponent
            formObjects={formArray}
            callback={callback}
            errors={request.errors}
            fetching={request.fetching}
            text="Sign In"
            initialState={initialState}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminSigninPage;
