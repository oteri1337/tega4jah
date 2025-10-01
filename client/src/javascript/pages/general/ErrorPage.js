import React from "react";
import { useHistory } from "react-router-dom";

function ErrorPage({ loccation }) {
  const history = useHistory();

  const onClick = () => {
    try {
      history.goBack();
    } catch (e) {
      history.push("/");
    }
  };

  return (
    <div className="container">
      <br />
      <a onClick={onClick}>Go Back</a>
      <br /> <br />
      <div className="card-panel ">
        <div className="container">
          <h1>404 Error</h1>
          <p>Resource Not Found</p>
          <p>{location.href}</p>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default ErrorPage;
