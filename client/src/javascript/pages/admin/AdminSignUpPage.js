import React from "react";
import { sendRequestThenDispatch } from "hooks";
import SubmitComponent from "../components/SubmitComponent";
import MessageComponent from "../components/MessageComponent";

function AdminSignUpPage({ history }) {
  const [password, setPassword] = React.useState("");
  const { state, request, callBack } = sendRequestThenDispatch();
  const { message, errors, fetching } = request;

  const settings = state.settings?.data[0];
  const email = settings?.contact_email;

  const onSuccess = () => {
    history.push("/cp");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const body = { email, password };
    callBack("/api/admins", "U", body, onSuccess);
  };

  return (
    <section className="row center">
      <div className="col l4 offset-l4 s12">
        <br />
        <h2>Create Admin</h2>
        <p>THIS LINK CAN ONLY BE USED ONCE</p>
        <br />

        <div className="card-panel">
          <form onSubmit={onSubmit}>
            <div className="input-field">
              <label className="active">email</label>
              <input id="email" type="email" value={email} />
            </div>

            <div className="input-field">
              <label className="active">password</label>
              <input
                id="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>

            <SubmitComponent {...{ fetching }} />
            <MessageComponent {...{ errors, message }} />
          </form>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </section>
  );
}

export default AdminSignUpPage;
