import React from "react";
import { Route, Redirect } from "react-router-dom";
import { DataContext } from "providers/DataProvider";

function GuestAdminRoute(props) {
  const { state } = React.useContext(DataContext);

  if (state.admin) {
    return <Redirect to="/cp/index" />;
  }

  return <Route {...props} />;
}

export default GuestAdminRoute;
