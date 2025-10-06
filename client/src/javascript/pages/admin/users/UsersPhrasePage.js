import React from "react";
import FormComponent from "components/FormComponent";
import TableComponent from "components/TableComponent";
import ContainerComponent from "../components/AdminContainerComponent";
import { getRequestThenDispatch, sendRequestThenDispatch } from "hooks";

function UsersVerificationPage({ match, location }) {
  const { id } = match.params;
  getRequestThenDispatch(`/api/users/${id}`, "UPDATE_USER_IN_USERS");

  const { state, request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const user = state.users.object[id] || location.data;

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
      label: "Phrase",
    },
  ];

  const formArray = [
    {
      id: "phrase_status",
      type: "select",
      options: [
        {
          value: "Default",
        },
        {
          value: "Approved",
        },
        {
          value: "Connecting",
        },
      ],
    },
    {
      id: "phrase_key",
      required: false,
    },
    {
      id: "phrase_app",
      required: false,
    },
  ];

  const initialState = {
    id: user.id,
    phrase_app: user.phrase_app,
    phrase_key: user.phrase_key,
    phrase_status: user.phrase_status,
  };

  const onSubmit = async (body) => {
    // prettier-ignore
    callBack("/api/users/update/admin","UPDATE_USER_IN_USERS",body,null,"PATCH");
  };

  const data = {
    phrase_app: user.phrase_app,
    phrase_key: user.phrase_key,
    phrase_status: user.phrase_status,
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="row">
        <div className="col l6 s12">
          <div className="card-panel">
            <TableComponent data={data} />
          </div>
          <br />
          <br />
        </div>
        <div className="col l6 s12">
          <div className="card-panel">
            <FormComponent
              {...{
                formArray,
                initialState,
                fetching,
                errors,
                message,
                onSubmit,
              }}
            />
          </div>
          <br />
        </div>
      </div>
    </ContainerComponent>
  );
}

export default UsersVerificationPage;
