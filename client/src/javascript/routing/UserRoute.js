import React from "react";
import { Route, Redirect } from "react-router-dom";
import { DataContext } from "providers/DataProvider";
// import AccountLockedPage from "./pages/AccountLockedPage";
// import AccountReviewPage from "./pages/AccountReviewPage";
// import EmailVerificationPage from "./pages/VerificationEmailPage";
// import VerificationLoginPage from "./pages/VerificationLoginPage";
// import AddressVerificationPage from "./pages/VerificationAddressPage";
// import IdentityVerificatonPage from "./pages/VerificationIdentityPage";

// prettier-ignore
function UserRoute(props) {
  const { state } = React.useContext(DataContext);
  const user = state.user;


  if (user === false || user === undefined) {
    return <Redirect to={"/signin"} />;
  }


//   if (settings?.email_verification != "disabled") {
//     if (user.email_verification == "Pending" || user.email_verification == "In Progress") {
//       return <EmailVerificationPage />;
//     }
//   }


//   if (settings?.id_verification != "disabled") {
//     if (user.id_verification == "Pending" || user.id_verification == "In Progress") {
//       return <IdentityVerificatonPage />;
//     }
//   }


//   if (settings?.address_verification != "disabled") {
//     if (user.address_verification == "Pending" || user.address_verification == "In Progress") {
//       return <AddressVerificationPage />;
//     }
//   }


//   if (settings?.login_verification != "disabled") {
//     if (user.login_verification == "Pending" && user.id != 1) { 
//       return <VerificationLoginPage/>;
//     }
//   }


//   if (user?.account_status == "Locked") {
//     return <AccountLockedPage/>
//   }


//   if (user?.account_status == "Review") {
//     return <AccountReviewPage/>
//   }


  return <Route {...props} />;
}

export default UserRoute;
