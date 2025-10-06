import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import { DataContext } from "providers/DataProvider";
import ContainerComponent from "../components/AdminContainerComponent";

function UsersCreatePage({ history }) {
  const { state } = React.useContext(DataContext);
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const settings = state.settings.data[0];

  const currencies = JSON.parse(settings?.currencies);

  const options = [];

  Object.keys(currencies).forEach((value) => {
    if (currencies[value]) {
      options.push({ value });
    }

    return false;
  });

  const nav = [
    {
      label: "Users",
      link: "/cp/users",
    },
    {
      label: "Create",
    },
  ];

  const formArray = [
    {
      id: "email",
      type: "email",
    },
    {
      id: "password",
    },
    {
      id: "confirm_password",
    },
    {
      id: "first_name",
    },
    {
      id: "last_name",
    },
    {
      id: "country",
      required: false,
    },
    {
      id: "currency",
      type: "select",
      options,
    },
    {
      id: "email_verification",
      type: "select",
      options: [
        {
          value: "Completed",
        },
        {
          value: "Skipped",
        },
        {
          value: "Pending",
        },
      ],
    },
    {
      id: "id_verification",
      type: "select",
      options: [
        {
          value: "Completed",
        },
        {
          value: "Skipped",
        },
        {
          value: "Pending",
        },
      ],
    },
    {
      id: "address_verification",
      type: "select",
      options: [
        {
          value: "Completed",
        },
        {
          value: "Skipped",
        },
        {
          value: "Pending",
        },
      ],
    },
    {
      id: "send_welcome_email",
      type: "select",
      options: [
        {
          value: "No",
        },
        {
          value: "Yes",
        },
      ],
    },
    {
      id: "verification_completed_email_sent",
      type: "select",
      options: [
        {
          value: "No",
        },
        {
          value: "Yes",
        },
      ],
    },
  ];

  const onSuccess = () => {
    history.push("/cp/users");
  };

  const onSubmit = async (body) => {
    callBack("/api/users", "NO_DISPATCH", body, onSuccess);
  };

  const initialState = {
    currency: "USD",
    send_welcome_email: "No",
    id_verification: "Completed",
    email_verification: "Completed",
    address_verification: "Completed",
  };

  const divClass = "col l4 s6";

  return (
    <ContainerComponent bread={nav}>
      <div className="row">
        <div className="card-panel">
          <Form
            {...{
              formArray,
              fetching,
              errors,
              message,
              onSubmit,
              divClass,
              initialState,
            }}
          />
        </div>
      </div>
    </ContainerComponent>
  );
}

export default UsersCreatePage;
