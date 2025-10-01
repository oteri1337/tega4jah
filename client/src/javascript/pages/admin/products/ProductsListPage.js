import React from "react";
import { getRequestThenDispatch } from "hooks";
import ListComponent from "components/ListComponent";
import DeleteComponent from "components/DeleteComponent";
import FloatingButtonComponent from "components/FloatingButtonComponent";
import AdminContainerComponent from "components/AdminContainerComponent";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ProductsListPage() {
  const dispatch = "UPDATE_PRODUCTS";

  const endpoint = `/api/products`;

  const { state, fetching } = getRequestThenDispatch(endpoint, dispatch);

  const list = state.products;

  const nav = [
    {
      label: `Products (${state?.products?.total})`,
    },
  ];

  const title = "Add Product";

  const to = "/cp/products/create";

  const callback = (props) => {
    const { id } = props;
    return (
      <div key={props.id} className="bg row">
        <div className="col s1">{props.id}</div>
        <Link to={`/cp/products/${props.id}`}>
          <div className="col s9">{props.name}</div>
        </Link>
        <div className="col s1">
          <DeleteComponent {...{ dispatch, endpoint, id }} />
        </div>
      </div>
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

export default ProductsListPage;
