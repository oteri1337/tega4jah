import React from "react";
import FadeInComponent from "./FadeInComponent";

function MessageComponent({ errors = [], message = "" }) {
  if (message.length) {
    return (
      <FadeInComponent>
        <br />
        <div
          className="green lighten-4 card-panel black-text"
          style={{ overflowWrap: "break-word" }}
        >
          {message}
        </div>
      </FadeInComponent>
    );
  }

  if (!errors.length) {
    return <React.Fragment />;
  }

  errors = errors.map((error) => (
    <React.Fragment key={error}>
      <span>{error}</span>
      <br />
    </React.Fragment>
  ));
  return (
    <FadeInComponent>
      <br />
      <div className="red black-text lighten-4 card-panel">{errors}</div>
    </FadeInComponent>
  );
}

export default MessageComponent;
