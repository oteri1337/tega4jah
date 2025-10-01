import React from "react";
import { sendFormRequestThenDispatch } from "hooks";
import Form from "components/UncontrolledFormComponent";
import VerificationSkipComponent from "./VerificationSkipComponent";
import VerifictionProgressComponent from "./VerificationProgressComponent";

function AddressVerificationPage() {
  const { request, callBack, state } = sendFormRequestThenDispatch();
  const { user } = state;
  const { fetching, errors, message } = request;

  const formObjects = [
    {
      id: "bill",
      type: "file",
    },
  ];

  const callback = (body) => {
    callBack("/api/users/upload/utility-bill", "UPDATE_USER", body);
  };

  if (state.user.address_verification == "In Progress") {
    return (
      <VerifictionProgressComponent
        verification={state.user.address_verification}
      />
    );
  }

  return (
    <div className="row">
      <div className="col l6 s12 offset-l3">
        <br />
        <br />
        <div className="card-panel">
          <center>
            <h2>Address Verification</h2>
            <p></p>
          </center>
          <br />
          <b>City</b> {user.city} <br />
          <b>State</b> {user.state} <br />
          <b>Zip Code</b> {user.post_code}
          <br />
          <b>Country</b> {user.country}
          <br />
          <b>Street Address</b> {user.street_address}
          <br />
          <br />
          <Form {...{ formObjects, fetching, errors, message, callback }} />
          <br />
          <VerificationSkipComponent type="address" />
        </div>
      </div>
    </div>
  );
}

export default AddressVerificationPage;
