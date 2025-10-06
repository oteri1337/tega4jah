import React from "react";
import FormComponent from "components/FormComponent";
import ContainerComponent from "../components/AdminContainerComponent";
import { getRequestThenDispatch, sendRequestThenDispatch } from "hooks";

function SendPushPage({ match }) {
  const { id } = match.params;

  getRequestThenDispatch(`/api/users/${id}`, "UPDATE_USER_IN_USERS");

  const { state, request, callBack } = sendRequestThenDispatch();

  const { fetching, errors, message } = request;

  const user = state.users.object[id];

  const devices = user.devices.data;

  const options = devices.map((device) => {
    return { label: device.user_agent, value: device.push_subscription };
  });

  if (!user) {
    return (
      <ContainerComponent bread={[]}>
        <div className="card-panel">
          <p>User Not Found</p>
        </div>
      </ContainerComponent>
    );
  }

  const nav = [
    {
      label: "Users",
      link: "/cp/users",
    },
    {
      label: `${user.first_name} ${user.last_name}`,
      link: `/cp/users/${id}`,
    },
    {
      label: "Profile",
      link: `/cp/users/${id}/profile`,
    },
    {
      label: "Send Push",
    },
  ];

  if (devices.length === 0) {
    return (
      <ContainerComponent bread={nav}>
        <div className="card-panel">
          <p>No Device Subscribed To Push Notifications</p>
        </div>
      </ContainerComponent>
    );
  }

  const formArray = [
    {
      label: "Device",
      id: "push_subscription",
      type: "select",
      options,
    },
    {
      id: "subject",
    },
    {
      id: "body",
      type: "textarea",
    },
  ];

  const onSubmit = async (body) => {
    callBack("/api/users/send/push", "NONE", body);
  };

  const initialState = {
    push_subscription: options[0].value,
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <FormComponent
          {...{
            formArray,
            initialState,
            fetching,
            errors,
            message,
            onSubmit,
          }}
        />
      </div>
    </ContainerComponent>
  );
}

export default SendPushPage;
