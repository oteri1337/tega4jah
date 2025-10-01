import React from "react";
import { sendRequestThenDispatch } from "hooks";

function SecondaryButtonComponent(props) {
  const { endpoint, type = "POST", dispatch, body, title = "", icon } = props;
  const { className = "green btn white-text" } = props;
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors } = request;

  if (fetching) {
    return (
      <div className="">
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-blue">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const onClick = () => {
    callBack(endpoint, dispatch, body, undefined, type);
  };

  if (props.text?.length) {
    return (
      <a className={className} style={{ padding: "10px" }} onClick={onClick}>
        {props.text}
      </a>
    );
  }

  return (
    <a className="secondary-content" onClick={onClick} title={title ?? ""}>
      <i className="material-icons"> {icon || "delete"}</i>
    </a>
  );
}

export default SecondaryButtonComponent;
