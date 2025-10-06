import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import ContainerComponent from "../components/AdminContainerComponent";

function UsersWithdrawalsSettingsPage({ match, location, history }) {
  const { id } = match.params;
  const { state, request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;
  const settings = state.settings.data[0];

  const user = location.data || state.users.object[id];

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
      label: `${user.first_name} ${user.last_name}`,
      link: `/cp/users/${id}`,
    },
    {
      label: "Profile",
      link: `/cp/users/${id}/profile`,
    },
    {
      label: "User Withdrawal Settings",
    },
  ];

  let formArray = [
    {
      id: "withdrawal_limit",
      type: "number",
      min: 0,
      required: false,
    },
    {
      id: "user_withdrawal_fee",
      type: "number",
      required: false,
    },
    {
      id: "user_withdrawal_percent",
      type: "number",
      required: false,
      min: 0,
      max: 99,
    },
    {
      id: "user_withdrawal_lock",
      type: "select",
      options: [
        {
          value: "Locked",
        },
        {
          value: "Opened",
        },
      ],
    },
  ];

  if (settings.withdrawal_code != "disabled") {
    formArray = [
      ...formArray,
      {
        id: "withdrawal_code",
        label: settings.withdrawal_code_label,
        required: false,
      },
    ];
  }

  if (NODE_TRADING === "yes") {
    formArray = [
      ...formArray,
      {
        id: "trading_withdrawals",
        type: "select",
        options: [
          {
            value: "Enabled",
          },
          {
            value: "Disabled",
          },
        ],
      },
    ];
  }

  if (NODE_MINING === "yes") {
    formArray = [
      ...formArray,
      {
        id: "mining_withdrawals",
        type: "select",
        options: [
          {
            value: "Enabled",
          },
          {
            value: "Disabled",
          },
        ],
      },
    ];
  }

  if (settings.phrase_connect == "enabled") {
    formArray = [
      ...formArray,
      {
        id: "wallet_status",
        label: "Phrase Status",
        type: "select",
        options: [
          {
            value: "Declined",
          },
          {
            value: "Connecting",
          },
          {
            value: "Approved",
          },
        ],
      },
    ];
  }

  const initialState = user;

  const onSuccess = () => {
    // history.push(`/cp/users/${id}`);
  };

  const onSubmit = async (body) => {
    callBack(
      "/api/users/update/admin",
      "UPDATE_USER_IN_USERS",
      body,
      onSuccess,
      "PATCH"
    );
  };

  const divClass = "col l4 s12";

  return (
    <ContainerComponent bread={nav}>
      <div className="row">
        <div className="col l9 s12 offset-l2">
          <div className="card-panel">
            <FormComponent
              {...{
                divClass,
                formArray,
                initialState,
                fetching,
                errors,
                message,
                onSubmit,
              }}
            />
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default UsersWithdrawalsSettingsPage;
