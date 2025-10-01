import React from "react";
import { getRequestThenDispatch } from "hooks";
import ListComponent from "components/ListComponent";
import DeleteComponent from "components/DeleteComponent";
import FloatingButtonComponent from "components/FloatingButtonComponent";
import AdminContainerComponent from "components/AdminContainerComponent";

function BlocksListPage({ location }) {
  const dispatch = "UPDATE_BLOCKS";

  const endpoint = `/api/blocks`;

  const { state, fetching } = getRequestThenDispatch(endpoint, dispatch);

  const list = state.blocks;

  const nav = [
    {
      label: `Blocked Ips (${state?.blocks?.total})`,
    },
  ];

  const title = "Add Blocks";

  const to = "/cp/blocks/create";

  const callback = (props) => {
    return (
      <li className="collection-item app-py-1" key={props.id}>
        <div className="row">
          <div className="col l11 s11">{props.ip_address}</div>
          <div className="col l1 s1" style={{ textAlign: "right" }}>
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
      <FloatingButtonComponent title={title} to={to} />
    </AdminContainerComponent>
  );
}

export default BlocksListPage;
