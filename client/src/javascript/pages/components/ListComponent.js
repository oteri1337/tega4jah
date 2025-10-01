import React, { Fragment } from "react";
import PaginationComponent from "./PaginationComponent";
import ListDefaultComponent from "./ListDefaultComponent";

function ListComponent(props) {
  const list = props.list || {};
  const data = list.data || [];

  const dispatch = props.dispatch || "";
  const fetching = props.fetching || false;
  const empty = props.empty || "No Data Found";

  const renderSpinner = () => {
    if (fetching) {
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    }
  };

  if (data.length === 0) {
    return (
      <Fragment>
        {renderSpinner()}
        {!fetching && <span className="app-font-normal">{empty}</span>}
      </Fragment>
    );
  }

  const callback =
    props.callback ||
    function (props) {
      return <ListDefaultComponent {...props} key={props.id} />;
    };

  const list_items = data.map(callback);

  return (
    <Fragment>
      {renderSpinner()}
      {list_items}
    </Fragment>
  );
}

export default ListComponent;
