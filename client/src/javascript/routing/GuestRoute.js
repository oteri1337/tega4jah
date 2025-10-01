import React from "react";
import { DataContext } from "providers/DataProvider";
import { Route, Redirect, useLocation } from "react-router-dom";

function GuestRoute(props) {
  const location = useLocation();

  const { state } = React.useContext(DataContext);

  if (state.user) {
    return <Redirect to={`/user/home${location.search}`} />;
  }

  return <Route {...props} />;
}

export default GuestRoute;
