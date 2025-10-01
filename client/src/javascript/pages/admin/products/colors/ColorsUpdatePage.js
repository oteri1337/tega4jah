import React from "react";
import { format } from "functions";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import TableComponent from "components/TableComponent";
import ContainerComponent from "../../components/AdminContainerComponent";

function DepositUpdatePage({ match, location, history }) {
  const { id, did } = match.params;
  const { state, request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const user = location.user || state.users.object[id];
  const data = location.data || user.deposits.data.find((d) => d.id == did);

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
      label: `${format(user.currency, data.amount)} `,
    },
  ];

  const formArray = [
    {
      id: "amount",
      type: "number",
    },
    {
      id: "status",
      type: "select",
      options: [
        {
          value: "Pending",
        },
        {
          value: "Confirmed",
        },
        {
          value: "Failed",
        },
      ],
    },
    {
      label: "Month",
      type: "select",
      id: "updated_at_month",
      options: [
        {
          value: "JAN",
        },
        {
          value: "FEB",
        },
        {
          value: "MAR",
        },
        {
          value: "APR",
        },
        {
          value: "MAY",
        },
        {
          value: "JUN",
        },
        {
          value: "JLY",
        },
        {
          value: "AUG",
        },
        {
          value: "SEP",
        },
        {
          value: "OCT",
        },
        {
          value: "NOV",
        },
        {
          value: "DEC",
        },
      ],
    },
    {
      label: "Day",
      type: "select",
      id: "updated_at_day",
      options: [
        {
          value: "01",
        },
        {
          value: "02",
        },
        {
          value: "03",
        },
        {
          value: "04",
        },
        {
          value: "05",
        },
        {
          value: "06",
        },
        {
          value: "07",
        },
        {
          value: "08",
        },
        {
          value: "09",
        },
        {
          value: "10",
        },
        {
          value: "11",
        },
        {
          value: "12",
        },
        {
          value: "13",
        },
        {
          value: "14",
        },
        {
          value: "15",
        },
        {
          value: "16",
        },
        {
          value: "17",
        },
        {
          value: "18",
        },
        {
          value: "19",
        },
        {
          value: "20",
        },
        {
          value: "21",
        },
        {
          value: "22",
        },
        {
          value: "23",
        },
        {
          value: "24",
        },
        {
          value: "25",
        },
        {
          value: "26",
        },
        {
          value: "27",
        },
        {
          value: "28",
        },
        {
          value: "29",
        },
        {
          value: "30",
        },
        {
          value: "31",
        },
      ],
    },
    {
      id: "comment",
      required: false,
    },
  ];

  const onSuccess = () => {
    history.push(`/cp/users/${id}/deposits`);
  };

  const onSubmit = async (body) => {
    callBack("/api/deposits", "UPDATE_USER_IN_USERS", body, onSuccess, "PATCH");
  };

  const initialState = {
    ...data,
  };

  const renderImage = () => {
    if (data?.proof?.length) {
      return <img src={`${data.proof}`} className="responsive-img" />;
    }
    return <b>NO PAYMENT PROOF</b>;
  };

  const renderEtherScan = () => {
    if (data.transaction_hash) {
      return (
        <center>
          <a
            target="_blank"
            href={`https://etherscan.io/tx/${data.transaction_hash}`}
          >
            VIEW ON ETHERSCAN
          </a>
        </center>
      );
    }
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="row">
          <div className="col l4 s12">
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

            <br />
            <center>{renderImage()}</center>
          </div>

          <div className="col l8 s12">
            {renderEtherScan()}
            <br />
            <TableComponent data={data} />
          </div>
        </div>
        <br />
      </div>
    </ContainerComponent>
  );
}

export default DepositUpdatePage;
