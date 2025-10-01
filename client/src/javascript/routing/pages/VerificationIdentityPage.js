import React from "react";
import { DataContext } from "providers/DataProvider";
import { sendFormRequestThenDispatch } from "hooks";
import Form from "components/UncontrolledFormComponent";
import VerificationSkipComponent from "./VerificationSkipComponent";
import VerifictionProgressComponent from "./VerificationProgressComponent";

function IdentityVerificationPage() {
  const { signOut } = React.useContext(DataContext);

  const { request, callBack, state } = sendFormRequestThenDispatch();
  const { fetching, errors, message } = request;
  const { user } = state;

  const formObjects = [
    {
      id: "front",
      type: "file",
    },
    {
      id: "back",
      type: "file",
    },
  ];

  const callback = (body) => {
    callBack("/api/users/upload/identity-card", "UPDATE_USER", body);
  };

  const renderVerification = () => {
    if (state.user.id_verification == "In Progress") {
      return (
        <VerifictionProgressComponent
          verification={state.user.id_verification}
        />
      );
    }

    return (
      <div className="col l4 s12 offset-l4">
        <div className="card-panel">
          <h3 className="btn-color center">Verify Your Identity</h3>
          <p style={{ textAlign: "justify" }}>
            Please verify your identity by uploading a valid government issued
            identification card. You may experience difficulties when uploading
            from an ios device. Make sure your browser has camera access in your
            ios settings.
          </p>
          <center>
            <br />
            <Form
              {...{
                formObjects,
                fetching,
                errors,
                message,
                callback,
                text: "Upload",
              }}
            />
            <br />
            <VerificationSkipComponent type="id" />
          </center>
        </div>

        <br />
        <br />
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <br />
      <br />
      <div className="row">{renderVerification()}</div>
    </div>
  );
}

export default IdentityVerificationPage;
