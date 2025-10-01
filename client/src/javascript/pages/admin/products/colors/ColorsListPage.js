import React from "react";
import { format } from "functions";
import { Link } from "react-router-dom";
import { getRequestThenDispatch } from "hooks";
import ListComponent from "components/ListComponent";
import DeleteComponent from "components/DeleteComponent";
import FloatingButtonComponent from "components/FloatingButtonComponent";
import ContainerComponent from "components/AdminContainerComponent";

function ColorsListPage({ match, location }) {
  const { id } = match.params;
  const endpoint = `/api/products/${id}`;

  const dispatch = "UPDATE_PRODUCT";

  const { state, fetching } = getRequestThenDispatch(endpoint, dispatch);

  const product = state.products.object[id] || location.data;

  if (!product) {
    return (
      <ContainerComponent bread={[]}>
        <div className="card-panel">
          <p>product Not Found</p>
        </div>
      </ContainerComponent>
    );
  }

  const list = product.colors;

  const nav = [
    {
      label: "Products",
      link: "/cp/products",
    },
    {
      label: product.name,
      link: `/cp/products/${id}`,
    },
    {
      label: "Colors",
    },
  ];

  const callback = (data) => {
    const pathname = `/cp/products/${id}/colors/${data.id}/update`;

    return (
      <div key={data.id} className="row bg">
        <div className="col s2">
          <img src={data.image} style={{ height: 100 }} />
        </div>

        <div className="col s9">
          <p>{data.color_name}</p>
          <p>{data.color_code}</p>
        </div>

        <div className="col s1">
          <DeleteComponent
            id={data.id}
            extras={{ product_id: data.product_id }}
            endpoint={`/api/colors`}
            dispatch="UPDATE_PRODUCT"
          />
        </div>
      </div>
    );
  };

  const title = "Add Color";

  const to = `/cp/products/${product.id}/colors/create`;

  return (
    <ContainerComponent bread={nav}>
      <ListComponent {...{ list, endpoint, dispatch, callback, fetching }} />
      <FloatingButtonComponent {...{ to, title, data: { product } }} />
    </ContainerComponent>
  );
}

export default ColorsListPage;
