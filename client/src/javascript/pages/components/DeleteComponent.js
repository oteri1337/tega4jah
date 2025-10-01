import React from "react";
import { sendRequestThenDispatch } from "hooks";

function DeleteComponent({
  endpoint,
  dispatch,
  id,
  extras = {},
  onSuccess,
  title,
  message,
  icon,
}) {
  const { callBack, request } = sendRequestThenDispatch();
  const { fetching, errors } = request;

  const successCallback = onSuccess || function () {};

  const onDelete = async (e, id) => {
    e.preventDefault();
    const sure = confirm(message ?? "are you sure you want to delete");
    if (sure) {
      await callBack(
        endpoint,
        dispatch,
        { id, ...extras },
        successCallback,
        "DELETE"
      );
    }
  };

  if (errors.length) {
    M.toast({
      html: errors[0],
      displayLength: 10000,
    });
  }

  if (fetching) {
    return (
      <div className="secondary-content">
        <div id="fetching" className="preloader-wrapper active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <span
      title={title ?? ""}
      onClick={(e) => onDelete(e, id)}
      className="material-symbols-outlined notranslate"
    >
      {icon || "delete"}
    </span>
  );
}

export default DeleteComponent;
