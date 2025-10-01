import React from "react";
import { Link } from "react-router-dom";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import { getPushSubscription } from "functions";
import SpinnerComponent from "components/SpinnerComponent";

import { countries } from "countries-list";

let country_options = Object.keys(countries)
  .map((country) => {
    return { value: countries[country].name };
  })
  .sort((a, b) => {
    var x = a.value.toLowerCase();
    var y = b.value.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });

function SignUpPage({ location, history }) {
  React.useEffect(() => {
    document.title = NODE_NAME;
  });

  const [push_subscription, setSubscription] = React.useState("");

  const { state, request, callBack } = sendRequestThenDispatch();

  React.useEffect(() => {
    async function asyncOperation() {
      const settings = state.settings.data;

      if (settings.length) {
        const key = settings[0].public_vapid_key;
        const subscription = await getPushSubscription(key);

        setSubscription(subscription);
      }
    }
    asyncOperation();
  }, [state.settings]);

  const { fetching, errors, message } = request;

  if (state.settings.data.length === 0) {
    return <SpinnerComponent />;
  }

  const settings = state.settings.data[0];

  const currencies = JSON.parse(settings?.currencies);

  const registration = JSON.parse(settings?.registration);

  const options = [];

  Object.keys(currencies).forEach((value) => {
    if (currencies[value]) {
      options.push({ value });
    }

    return false;
  });

  const text = "CREATE MY ACCOUNT";

  let formArray = [
    {
      id: "currency",
      type: "select",
      options,
    },
    {
      id: "email",
      type: "email",
    },
    {
      id: "password",
      type: "password",
    },
    {
      id: "confirm_password",
      type: "password",
    },
  ];

  if (registration.first_name) {
    formArray = [
      ...formArray,
      {
        id: "first_name",
      },
    ];
  }

  if (registration.last_name) {
    formArray = [
      ...formArray,
      {
        id: "last_name",
      },
    ];
  }

  if (registration.mobile_number) {
    formArray = [
      ...formArray,
      {
        id: "mobile_number",
      },
    ];
  }

  if (registration.date_of_birth) {
    formArray = [
      ...formArray,
      {
        id: "date_of_birth",
        type: "date",
      },
    ];
  }

  if (registration.state) {
    formArray = [
      ...formArray,
      {
        id: "state",
      },
    ];
  }

  if (registration.city) {
    formArray = [
      ...formArray,
      {
        id: "city",
      },
    ];
  }

  if (registration.address) {
    formArray = [
      ...formArray,
      {
        id: "address",
      },
    ];
  }

  if (registration.country) {
    formArray = [
      ...formArray,
      {
        id: "country",
        type: "select",
        options: country_options,
      },
    ];
  }

  if (settings.demo_trading == "enabled") {
    formArray = [
      {
        id: "account_type",
        type: "select",
        options: [
          {
            value: "Live",
            label: "LIVE",
          },
          {
            value: "Demo",
            label: "DEMO",
          },
        ],
      },
      ...formArray,
    ];
  }

  formArray = [
    ...formArray,
    {
      id: "agreement",
      required: true,
      link: "/pages/terms-of-service",
      label:
        "I declare that the information provided is correct and accept all terms of service",
      type: "checkbox",
    },
  ];

  const onSuccess = () => {
    history.push("/user/home");
  };

  const onSubmit = (body) => {
    body = { ...body, push_subscription };
    callBack("/api/users", "UPDATE_USER", body, onSuccess);
  };

  const params = new URLSearchParams(location.search);
  const user_id = params.get("user_id");
  const trader_id = params.get("trader_id");

  const initialState = {
    user_id: user_id || null,
    currency: options[0].value,
    trader_id: trader_id || null,
    country: "United States",
  };

  const renderMessage = () => {
    if (user_id || trader_id) {
      return (
        <ul className="collection">
          <li className="collection-item">
            <center>YOU ARE SIGNING UP VIA A REFERRAL LINK</center>
          </li>
        </ul>
      );
    }
  };

  const divClass = "col l4 s6";

  return (
      <div className=" row">
        <div className="container">
          <br />
          <br />
          <h6 className="center">Create An Account</h6>
          <br />
          <br />
          <div className="card-panel " style={{ borderRadius: "10px" }}>
            {renderMessage()}
            <center>
              <Form
                {...{
                  divClass,
                  formArray,
                  text,
                  fetching,
                  errors,
                  message,
                  onSubmit,
                  initialState,
                }}
              />
            </center>
          </div>
          <br />
          <br />
          <p className="center">
            Already have an account? <Link to="/signin">Login</Link>
          </p>
          <br />

          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
  );
}

export default SignUpPage;
