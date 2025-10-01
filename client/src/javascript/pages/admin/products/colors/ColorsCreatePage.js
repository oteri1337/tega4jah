import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import ContainerComponent from "../../components/AdminContainerComponent";

function DepositCreatePage({ match, location, history }) {
  const { id } = match.params;
  const { state, request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;
  const settings = state.settings.data[0];
  const user = location.user || state.users.object[id];

  const nav = [
    {
      label: "Users",
      link: "/cp/users",
    },
    {
      label: `${user?.first_name ?? ""} ${user?.last_name ?? id}`,
      link: `/cp/users/${id}`,
    },
    {
      label: "Deposits",
      link: `/cp/users/${id}/deposits`,
    },
    {
      label: `Create`,
    },
  ];

  let accounts = [];

  if (NODE_TRADING === "yes") {
    if (settings.trading_balance === "total_only") {
      accounts = [
        ...accounts,
        {
          value: "trading_balance_total",
          label: "Trading Balance",
        },
        {
          value: "holding_balance",
          label: "Holding Balance",
        },
      ];
    } else {
      accounts = [
        ...accounts,
        {
          value: "trading_balance_deposit",
          label: "Trading Balance Deposit",
        },
        {
          value: "holding_balance",
          label: "Holding Balance",
        },
      ];
    }
  }

  if (NODE_STAKING === "yes") {
    accounts = [
      ...accounts,
      {
        value: "staking_balance",
        label: "Staking Balance",
      },
    ];
  }

  if (NODE_NFT === "yes") {
    accounts = [
      ...accounts,
      {
        value: "nft_balance",
        label: "NFT Balance",
      },
    ];
  }

  let formArray = [
    {
      id: "amount",
      type: "number",
      prefix: user.currency,
    },
    {
      id: "status",
      type: "select",
      className: "app-mb-2",
      options: [
        {
          value: "Pending",
        },
        {
          value: "Confirmed",
        },
      ],
    },
    {
      id: "account",
      type: "select",
      options: accounts,
      className: "app-mb-2",
    },
  ];

  let formArrayPurchase = [
    {
      id: "amount",
      type: "number",
      prefix: user.currency,
    },
    {
      id: "status",
      type: "select",
      className: "app-mb-2",
      options: [
        {
          value: "Pending",
        },
        {
          value: "Confirmed",
        },
      ],
    },
    {
      id: "comment",
      placeholder: "What is the user paying for",
    },
  ];

  const onSuccess = () => {
    history.push(`/cp/users/${id}/deposits`);
  };

  const onSubmit = async (body) => {
    callBack("/api/deposits", "UPDATE_USER_IN_USERS", body, onSuccess);
  };

  const initialState = {
    user_id: id,
    status: "Confirmed",
    created_by_admin: 1,
    currency: user.currency,
    account: accounts[0]?.value,
  };

  const initialStatePurchase = {
    user_id: id,
    type: "Purchase",
    status: "Confirmed",
    created_by_admin: 1,
    currency: user.currency,
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="row">
        <div className="col l6 s12">
          <div className="card-panel">
            <p className="center">Funding</p>
            <FormComponent
              {...{
                formArray,
                errors,
                fetching,
                message,
                onSubmit,
                initialState,
              }}
            />
          </div>
          <br />
        </div>

        <div className="col l6 s12">
          <div className="card-panel">
            <p className="center">Purchase</p>
            <FormComponent
              {...{
                formArray: formArrayPurchase,
                errors,
                fetching,
                message,
                onSubmit,
                initialState: initialStatePurchase,
              }}
            />
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default DepositCreatePage;
