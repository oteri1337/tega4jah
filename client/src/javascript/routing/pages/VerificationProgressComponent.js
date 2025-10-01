import React from "react";
import { DataContext } from "providers/DataProvider";

function VerifictionProgressComponent({ verification }) {
  const { signOut } = React.useContext(DataContext);

  if (verification == "In Progress") {
    return (
      <section className="row">
        <div className="col l4 s12 offset-l4 center">
          <br />
          <br />
          <br />
          <div className="card-panel">
            <br />
            <center>
              <h3>Verification in Progress</h3>
              <br />
              <p>
                Your account is currently being reviewed, as soon as
                verification is completed, we will activate your account and
                contact you via email.
              </p>
              <br />
              <a onClick={signOut} className="btn btn-secondary">
                LOGOUT
              </a>
            </center>

            <br />
          </div>
        </div>
      </section>
    );
  }

  return <React.Fragment />;
}

export default VerifictionProgressComponent;
