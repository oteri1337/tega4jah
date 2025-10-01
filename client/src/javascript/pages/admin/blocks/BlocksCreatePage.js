import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import ContainerComponent from "components/AdminContainerComponent";

function BlocksCreatePage({ history }) {
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const nav = [
    {
      label: "Blacked Ips",
      link: "/cp/blocks",
    },
    {
      label: "Create",
    },
  ];

  const formArray = [
    {
      id: "ip_address",
    },
  ];

  const onSuccess = () => {
    history.push("/cp/blocks");
  };

  const onSubmit = async (body) => {
    callBack("/api/blocks", "NO_DISPATCH", body, onSuccess);
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <Form {...{ formArray, fetching, errors, message, onSubmit }} />
      </div>
    </ContainerComponent>
  );
}

export default BlocksCreatePage;
