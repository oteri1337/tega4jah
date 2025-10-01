import React from "react";
import { DataContext } from "providers/DataProvider";

function AccountLockedPage() {
  const { state, signOut } = React.useContext(DataContext);

  return (
    <section
      style={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container">
        <h1>Account Locked</h1>
        <p>
          Your account {state.user.email} is currently locked, please contact{" "}
          {state.settings.data[0].contact_email} to unlock
        </p>
        <a onClick={signOut}>LOGOUT</a>
      </div>
    </section>
  );
}

export default AccountLockedPage;
