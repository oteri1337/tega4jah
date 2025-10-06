import React from "react";
import { Link } from "react-router-dom";
import { getRequestThenDispatch } from "hooks";
import UsersLogInComponent from "./UsersLogInComponent";
import ContainerComponent from "../components/AdminContainerComponent";

function UsersProfilePage({ match, location }) {
  const { id } = match.params;
  const dispatch = "UPDATE_USER_IN_USERS";
  const { state } = getRequestThenDispatch(`/api/users/${id}`, dispatch);

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
      label: "Users",
      link: "/cp/users",
    },
    {
      label: `${user.first_name} ${user.last_name}`,
      link: `/cp/users/${id}`,
    },
    {
      label: "Profile",
    },
  ];

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <p>
          <Link to={`/cp/users/${id}/phrase`}>Phrase</Link>
        </p>

        <p>
          <Link to={`/cp/users/${id}/push`}>Send Push</Link>
        </p>

        <p>
          <Link to={`/cp/users/${id}/email`}>Send Email</Link>
        </p>

        <p>
          <Link to={`/cp/users/${id}/verification`}>Verification</Link>
        </p>

        <p>
          <Link to={`/cp/users/${id}/update`}>Update Profile</Link>
        </p>

        <p>
          <Link to={`/cp/users/${id}/withdrawals-settings`}>
            User Withdrawals Settings
          </Link>
        </p>

        <p>
          <Link to={`/cp/settings/withdrawals`}>
            Website Withdrawals Settings
          </Link>
        </p>

        <br />
        <br />

        <UsersLogInComponent email={user.email} password={user.password} />
      </div>
    </ContainerComponent>
  );
}

export default UsersProfilePage;
