import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import TableComponent from "components/TableComponent";
import ContainerComponent from "components/AdminContainerComponent";

function AssetsCreatePage({ history }) {
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const nav = [
    {
      label: "Assets",
      link: "/cp/assets",
    },
    {
      label: "Add",
    },
  ];

  const formArray = [
    {
      id: "tradingview",
      placeholder: "BTCUSD",
    },
    {
      id: "name",
      placeholder: "Bitcoin",
    },
    {
      id: "type",
    },
    {
      id: "icon",
      required: false,
    },
  ];

  const onSuccess = () => {
    history.push("/cp/tradeables");
  };

  const onSubmit = async (body) => {
    callBack("/api/tradeables", "NO_DISPATCH", body, onSuccess);
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <Form {...{ formArray, fetching, errors, message, onSubmit }} />
      </div>
    </ContainerComponent>
  );
}

export default AssetsCreatePage;
