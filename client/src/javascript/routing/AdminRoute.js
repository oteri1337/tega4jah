import React from "react";
import { Route, Redirect } from "react-router-dom";
import { DataContext } from "providers/DataProvider";

function AdminRoute(props) {
  const { state } = React.useContext(DataContext);

  if (!state.admin) {
    return <Redirect to="/cp" />;
  }

  return <Route {...props} />;
}

export default AdminRoute;
