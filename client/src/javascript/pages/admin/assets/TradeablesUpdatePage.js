import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import TableComponent from "components/TableComponent";
import ContainerComponent from "components/AdminContainerComponent";

function AssetsUpdatePage({ history, match }) {
  const { id } = match.params;

  // getRequestThenDispatch(`/api/assets/${id}`, "UPDATE_ASSET");

  const { request, callBack, state } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const data = location.prop || state.assets.object[id];

  if (!data) {
    return (
      <ContainerComponent>
        <div className="card-panel">
          <p>Not Found</p>
        </div>
      </ContainerComponent>
    );
  }

  const nav = [
    {
      label: "Assets",
      link: "/cp/assets",
    },
    {
      label: `Update ${data.tradingview}`,
    },
  ];

  const formArray = [
    {
      id: "mineable",
      type: "select",
      options: [
        {
          value: "no",
        },
        {
          value: "yes",
        },
      ],
    },
    {
      id: "stakeable",
      type: "select",
      options: [
        {
          value: "no",
        },
        {
          value: "yes",
        },
      ],
    },
    {
      id: "icon",
    },
  ];

  const onSuccess = () => {
    history.goBack();
  };

  const onSubmit = async (body) => {
    callBack("/api/assets", "NO_DISPATCH", body, onSuccess, "PATCH");
  };

  const initialState = data;

  // const { icon, ...initialState } = data;

  return (
    <ContainerComponent bread={nav}>
      <div className="row">
        <div className="col l6 s12">
          <div className="card-panel">
            <Form
              {...{
                formArray,
                fetching,
                errors,
                message,
                onSubmit,
                initialState,
              }}
            />
            <br />
          </div>
          <br />
        </div>
        <div className="col l6 s12">
          <div className="card-panel">
            <TableComponent data={data} />
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default AssetsUpdatePage;
