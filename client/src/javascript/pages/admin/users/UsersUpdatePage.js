import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import ContainerComponent from "../components/AdminContainerComponent";

function UsersUpdatePage({ match, location, history }) {
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

  let formArray = [];

  if (NODE_TRADING === "yes") {
    if (settings.trading_balance == "total_only") {
      formArray = [
        ...formArray,
        {
          id: "trading_balance_total",
          label: "Trading Balance",
          type: "number",
          min: 0,
        },
      ];
    } else {
      formArray = [
        ...formArray,
        {
          id: "trading_balance_deposit",
          type: "number",
          min: 0,
        },
        {
          id: "trading_balance_profit",
          type: "number",
          min: 0,
        },
      ];
    }
  }

  if (NODE_NFT === "yes") {
    formArray = [
      ...formArray,
      {
        id: "nft_balance",
        type: "number",
        min: 0,
        required: false,
      },
    ];
  }

  if (NODE_HOLDING === "yes") {
    formArray = [
      ...formArray,
      {
        id: "holding_balance",
        type: "number",
        min: 0,
        required: false,
      },
    ];
  }

  if (NODE_MINING === "yes") {
    formArray = [
      ...formArray,
      {
        id: "mining_balance",
        type: "number",
        min: 0,
      },
    ];
  }

  if (NODE_STAKING === "yes") {
    formArray = [
      ...formArray,
      {
        id: "staking_balance",
        type: "number",
        min: 0,
        required: false,
      },
    ];
  }

  formArray = [
    ...formArray,
    {
      id: "message",
      type: "textarea",
    },
    {
      id: "message_type",
      type: "select",
      options: [
        {
          value: "Normal",
        },
        {
          value: "Popup",
        },
      ],
    },
    {
      id: "account_status",
      type: "select",
      options: [
        {
          value: "Review",
        },
        {
          value: "Active",
        },
        {
          value: "Locked",
        },
      ],
    },
  ];

  if (NODE_ENV === "development") {
    formArray = [...formArray];
  }

  if (NODE_TRADING === "yes") {
    formArray = [
      ...formArray,
      {
        id: "user_self_trading",
        type: "select",
        options: [
          {
            value: "disabled",
          },
          {
            value: "enabled",
          },
        ],
      },
      {
        id: "trading_progress",
        type: "number",
        min: 0,
        max: 100,
      },
      {
        id: "signal_strength",
        type: "number",
        min: 0,
        max: 100,
      },
      {
        id: "trading_period",
        type: "number",
        min: 0,
        max: 100,
      },

      {
        id: "trading_plan",
        required: false,
      },
    ];

    if (settings.trading_balance_withdrawal === "enabled") {
      formArray = [
        ...formArray,
        {
          id: "trading_balance_withdrawal",
          type: "number",
        },
      ];
    }
  }

  formArray = [
    ...formArray,

    {
      id: "referral_balance",
      type: "number",
      min: 0,
    },
  ];

  formArray = [...formArray];

  if (user.id == 1) {
    formArray = [
      ...formArray,
      {
        id: "email",
      },
      {
        id: "currency",
        type: "select",
        options: [
          { value: "AUD" },
          { value: "BRL" },
          { value: "CAD" },
          { value: "EUR" },
          { value: "GBP" },
          { value: "USD" },
          { value: "JPY" },
          { value: "PHP" },
          { value: "ZAR" },
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

  const divClass = "col l3 s6";

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
      label: "Update Profile",
    },
  ];

  return (
    <ContainerComponent bread={nav}>
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
    </ContainerComponent>
  );
}

export default UsersUpdatePage;
