import React from "react";
import TableComponent from "components/TableComponent";
import { getRequestThenDispatch } from "hooks";
import ContainerComponent from "../../components/AdminContainerComponent";

function UsersReadPage({ location, match }) {
  const { id } = match.params;
  const dispatch = "UPDATE_USER_IN_USERS";
  const { state } = getRequestThenDispatch(`/api/users/${id}`, dispatch);

  const user = state.users.object[id] || location.props;

  if (!user) {
    return (
      <ContainerComponent bread={[]}>
        <div className="card-panel">
          <p>Not Found</p>
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
    },
  ];

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel ">
        <div className="row">
          <TableComponent data={user} />
        </div>
      </div>
      <br />
    </ContainerComponent>
  );
}

export default UsersReadPage;
