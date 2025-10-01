import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import ContainerComponent from "components/AdminContainerComponent";

function productsCreatePage({ history }) {
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const nav = [
    {
      label: "Products",
      link: "/cp/products",
    },
    {
      label: "Create",
    },
  ];

  const formArray = [
    {
      id: "name",
    },
    {
      id: "price",
      type: "number",
    },
  ];

  const onSuccess = () => {
    history.push("/cp/products");
  };

  const onSubmit = async (body) => {
    callBack("/api/products", "NO_DISPATCH", body, onSuccess);
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <Form {...{ formArray, fetching, errors, message, onSubmit }} />
      </div>
    </ContainerComponent>
  );
}

export default productsCreatePage;
