import React from "react";
import { Link } from "react-router-dom";
import { getRequestThenDispatch } from "hooks";
import ListComponent from "components/ListComponent";
import DeleteComponent from "components/DeleteComponent";
import AdminContainerComponent from "components/AdminContainerComponent";

function OrdersListPage() {
  const dispatch = "UPDATE_ORDERS";

  const endpoint = `/api/orders`;

  const { state, fetching } = getRequestThenDispatch(endpoint, dispatch);

  const list = state.orders;

  const nav = [
    {
      label: `Orders (${state?.orders?.total})`,
    },
  ];

  const callback = (props) => {
    return (
      <li className="collection-item app-py-1" key={props.id}>
        <div className="row">
          <Link to={`/cp/orders/${props.id}`}>
            <div className="col s4">#{props.id}</div>

            <div className="col s4">{props.status}</div>
            <div className="col s3">{props.total}</div>
          </Link>

          <div className="col s1" style={{ textAlign: "right" }}>
            <DeleteComponent {...{ endpoint, dispatch, id: props.id }} />
          </div>
        </div>
      </li>
    );
  };

  return (
    <AdminContainerComponent bread={nav}>
      <ListComponent
        list={list}
        dispatch={`${dispatch}`}
        callback={callback}
        fetching={fetching}
      />
    </AdminContainerComponent>
  );
}

export default OrdersListPage;
