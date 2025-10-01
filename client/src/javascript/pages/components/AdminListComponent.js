import React, { Fragment } from "react";
import { getRequestThenDispatch } from "hooks";
import ListComponent from "components/ListComponent";
import SearchComponent from "components/SearchComponent";
import AdminContainerComponent from "./AdminContainerComponent";
import ListDefaultComponent from "components/ListDefaultComponent";
import FloatingButtonComponent from "components/FloatingButtonComponent";

function AdminListComponent(props) {
  const endpoint = props.endpoint || "";

  const dispatch = props.dispatch || "";

  const { state, fetching } = getRequestThenDispatch(endpoint, dispatch);

  const list = state[props.list] || [];

  const nav = props.nav || [];
  const to = props.to || false;

  const callback =
    props.callback ||
    function (props) {
      return <ListDefaultComponent {...props} key={props.id} />;
    };

  const renderSearch = () => {
    return (
      <>
        <SearchComponent
          endpoint={endpoint + "/search"}
          dispatch={dispatch}
          label="SEARCH"
          data={list.search_keys}
        />
      </>
    );
  };

  return (
    <AdminContainerComponent bread={nav}>
      {renderSearch()}
      <ListComponent
        list={list}
        dispatch={`${dispatch}`}
        callback={callback}
        fetching={fetching}
      />
      {to ? (
        <FloatingButtonComponent title={props.title} to={to} />
      ) : (
        <Fragment />
      )}
      <br />
    </AdminContainerComponent>
  );
}

export default AdminListComponent;
