import React from "react";
import { Link } from "react-router-dom";
import FormComponent from "components/FormComponent";
import TableComponent from "components/TableComponent";
import ContainerComponent from "../components/AdminContainerComponent";
import { getRequestThenDispatch, sendRequestThenDispatch } from "hooks";

function UsersVerificationPage({ match, location }) {
  const { id } = match.params;
  getRequestThenDispatch(`/api/users/${id}`, "UPDATE_USER_IN_USERS");

  const { state, request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const settings = state.settings.data[0];

  const verification_settings = {
    mail_driver: settings.mail_driver,
    id_verification: settings.id_verification,
    email_verification: settings.email_verification,
    address_verification: settings.address_verification,
  };

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
      label: "Verification",
    },
  ];

  const formArray = [
    {
      id: "id_verification",
      padded: true,
      type: "select",
      options: [
        {
          value: "Pending",
        },
        {
          value: "Skipped",
        },
        {
          value: "Completed",
        },
        {
          value: "In Progress",
        },
      ],
    },
    {
      id: "address_verification",
      type: "select",
      options: [
        {
          value: "Pending",
        },
        {
          value: "Completed",
        },
        {
          value: "In Progress",
        },
      ],
    },
  ];

  const initialState = {
    id: user.id,
    id_verification: user.id_verification,
    address_verification: user.address_verification,
  };

  const onSubmit = async (body) => {
    // prettier-ignore
    callBack("/api/users/update/admin","UPDATE_USER_IN_USERS",body,null,"PATCH");
  };

  const onDeleteSubmit = async (body) => {
    // prettier-ignore
    callBack("/api/users/update/admin","UPDATE_USER_IN_USERS",body,null,"PATCH");
  };

  const data = {
    pin: user.pin,

    id_verification: user.id_verification,
    email_verification: user.email_verification,
    address_verification: user.address_verification,
    required_verifications: user.all_required_verifications,

    send_welcome_email: user.send_welcome_email,

    send_email_verification_code: user.send_email_verification_code,

    verification_completed_email_sent: user.verification_completed_email_sent,

    photo_back_view: user.photo_back_view,
    photo_front_view: user.photo_front_view,
    photo_utility_bill: user.photo_utility_bill,
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="row">
        <div className="col l4 s12">
          <div className="container">
            <br />
            <p className="center"></p>
            <br />
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

          <center>
            {user.photo_back_view?.length > 0 && (
              <div>
                <br />
                <img
                  src={`${user.photo_back_view}`}
                  className="responsive-img"
                  style={{ maxHeight: "20vh" }}
                />
              </div>
            )}

            {user.photo_front_view?.length > 0 && (
              <div>
                <img
                  src={`${user.photo_front_view}`}
                  className="responsive-img"
                  style={{ maxHeight: "20vh" }}
                />
              </div>
            )}

            {user.photo_front_view.length > 0 && (
              <FormComponent
                {...{
                  fetching,
                  errors,
                  message,
                  onSubmit: onDeleteSubmit,
                  initialState: {
                    id: user.id,
                    photo_back_view: "",
                    photo_front_view: "",
                  },
                  text: "Delete Id Cards",
                }}
              />
            )}

            {user.photo_utility_bill?.length > 0 && (
              <div>
                <img
                  src={`${user.photo_utility_bill}`}
                  className="responsive-img"
                  style={{ maxHeight: "20vh" }}
                />
              </div>
            )}
          </center>

          <br />
        </div>

        <div className="col l4 s12">
          <h2 className="center">USER VERIFICATION</h2>
          <div className="card-panel">
            <TableComponent data={data} />
          </div>
        </div>

        <div className="col l4 s12">
          <h2 className="center">WEBSITE SETTINGS</h2>
          <div className="card-panel">
            <TableComponent data={verification_settings} />
            <center>
              <br />
              <Link to="/cp/settings/mail">Website Mail Settings</Link>
              <br />
              <br />
              <Link to="/cp/settings/verifications">
                Website Verifiction Settings
              </Link>
            </center>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default UsersVerificationPage;
