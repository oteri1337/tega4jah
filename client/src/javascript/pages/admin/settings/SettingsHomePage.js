import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import ContainerComponent from "components/AdminContainerComponent";

function SettingsMailPage() {
  const { request, callBack, state } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const initialState = state.settings.data[0];

  const onSuccess = () => {};

  const onSubmit = async (body) => {
    callBack("/api/settings", "UPDATE_SETTINGS", body, onSuccess, "PATCH");
  };

  const text = "Update";

  const nav = [
    {
      label: "Settings",
    },
  ];

  const formArray = [
    {
      id: "google_maps_api_key",
    },
    {
      id: "mail_driver",
      type: "select",
      padded: true,
      options: [
        {
          value: "mail",
        },
        {
          value: "smtp",
        },
      ],
    },
    {
      id: "mail_template",
      type: "select",
      padded: true,
      options: [
        {
          value: "plain",
        },
        {
          value: "html1",
          label: "html 1 - logo",
        },
        {
          value: "html2",
          label: "html 2 - pink",
        },
        {
          value: "html3",
          label: "html 3 - light",
        },
        {
          value: "html4",
          label: "html 4 - dark",
        },
      ],
    },
    {
      id: "smtp_server",
    },
    {
      id: "smtp_port",
      type: "number",
      min: 1,
    },
  ];

  return (
    <ContainerComponent bread={nav} wallets={false}>
      <div className="row">
        <div className="col l4 offset-l4 s12">
          <div className="card-panel">
            <Form
              {...{
                formArray,
                fetching,
                errors,
                message,
                onSubmit,
                text,
                initialState,
              }}
            />
          </div>
        </div>
      </div>

      <br />
    </ContainerComponent>
  );
}

export default SettingsMailPage;
