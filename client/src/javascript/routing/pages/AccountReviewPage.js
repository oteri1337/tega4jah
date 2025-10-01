import React from "react";
import { DataContext } from "providers/DataProvider";

function AccountReviewPage() {
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
        <h1>Account Review</h1>
        <p>
          Your account {state.user.email} is currently under review, Please
          check back later or contact {state.settings.data[0].contact_email}
        </p>
        <a onClick={signOut}>LOGOUT</a>
      </div>
    </section>
  );
}

export default AccountReviewPage;
