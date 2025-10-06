import React from "react";
import { useFetch } from "hooks";
import { Link } from "react-router-dom";
import DeleteComponent from "components/DeleteComponent";
import AdminListComponent from "../../components/AdminListComponent";

function UsersListPage() {
  const { request, fetching } = useFetch();

  const nav = [
    {
      label: "Users",
    },
  ];

  const endpoint = "/api/users";

  const dispatch = "UPDATE_USERS";

  const list = "users";

  const method = "PATCH";

  const pinUser = (id) => {
    const body = { pinned: Date.now(), id };
    const endpoint = "/api/users/list/update";
    request({ method, endpoint, dispatch, body });
  };

  const unPinUser = (id) => {
    const body = { pinned: 0, id };
    const endpoint = "/api/users/list/update";
    request({ method, endpoint, dispatch, body });
  };

  const renderPinned = (user) => {
    if (fetching) {
      return <></>;
    }

    if (user.pinned) {
      return (
        <span
          className="material-symbols-outlined"
          onClick={() => unPinUser(user.id)}
        >
          cancel
        </span>
      );
    }

    return (
      <span
        className="material-symbols-outlined"
        onClick={() => pinUser(user.id)}
      >
        push_pin
      </span>
    );
  };

  const callback = (user) => {
    const { id, first_name, last_name, photo_profile } = user;

    if (user.hidden == 1 && NODE_ENV == "production" && NODE_SAMPLE == "no") {
      return <React.Fragment key={id}></React.Fragment>;
    }

    const message = `are you sure you want to delete ${first_name} ${last_name}`;

    return (
      <div className="collection-item bg" key={id}>
        <div className="row">
          <Link to={{ pathname: `/cp/users/${id}`, user }}>
            <div className="col l1 s3">
              <img
                className="circle"
                style={{ height: "70px", width: "70px" }}
                src={`${photo_profile}`}
              />
            </div>
            <div className="col l9 s6">
              <span className="grey-text">{user.id} </span>
              <b className="btn-color">
                {first_name} {last_name}
              </b>
              <br /> <span className="grey-text">{user.email}</span>
            </div>
          </Link>
          <div className="col l1 s1">{renderPinned(user)}</div>

          <div
            className="col l1 s2"
            style={{ textAlign: "right", height: "69px" }}
          >
            <DeleteComponent
              {...{ id, endpoint, dispatch, message, className: "" }}
            />
          </div>
        </div>
      </div>
    );
  };

  const title = "Add User";

  const to = "/cp/users/create";

  return (
    <AdminListComponent
      {...{ nav, endpoint, dispatch, list, callback, to, title }}
    />
  );
}

export default UsersListPage;
