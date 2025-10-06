import React from "react";
import { Link } from "react-router-dom";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import ContainerComponent from "../components/AdminContainerComponent";

function SendEmailPage({ match, location }) {
  const { id } = match.params;
  const { state, request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const user = location.data || state.users.object[id];

  const from = state.settings.data[0].contact_email;

  const driver = state.settings.data[0].mail_driver;

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
      label: "Send Email",
    },
  ];

  let formArray = [
    {
      id: "subject",
      divClass: "col l12 s12",
    },
    {
      id: "body",
      type: "textarea",
      height: "150px",
    },
    {
      id: "smtp_server",
      type: "select",
      options: [
        {
          value: NODE_DOMAIN.replace("https://", ""),
        },
        {
          value: `mail.${NODE_DOMAIN.replace("https://", "")}`,
        },
        {
          value: "smtp.titan.email",
        },
        {
          value: "smtp.hostinger.com",
        },
      ],
    },
  ];

  if (driver == "smtp") {
    formArray = [
      ...formArray,
      {
        id: "password",
        label: "Password (Your Email Password)",
      },
    ];
  }

  const onSubmit = async (body) => {
    callBack("/api/contact", "NONE", body);
  };

  const initialState = {
    from,
    to: user.email,
    smtp_server: state.settings.data[0].smtp_server,
  };

  const text = "Send";

  const divClass = "col l6 s12";

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="row">
          <div className="col l9 s12">
            <FormComponent
              {...{
                formArray,
                initialState,
                fetching,
                errors,
                message,
                onSubmit,
                text,
                divClass,
              }}
            />
            <br />
          </div>

          <div className="col l3 s12 ">
            <Link to="/cp/settings/mail/general">Mail Settings</Link> <br />
            <br />
            <p>
              <b>DRIVER</b> {driver}
            </p>
            <p>
              <b>TEMPLATE</b> {state.settings.data[0].mail_template}
            </p>
            <p>
              <b>TO</b> {user.email}
            </p>
            <p>
              <b>FROM</b> {from}
            </p>
            <br />
            <p>
              Emails might not be delivered or could land in spam if they
              include: <br />
              <br />* Links in the message <br />
              <br />* Wallet addresses <br /> <br /> * Money talk (like amounts
              or transactions) <br />
              <br />* Misspellings, typos, or incomplete/unnatural sentences
            </p>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default SendEmailPage;
