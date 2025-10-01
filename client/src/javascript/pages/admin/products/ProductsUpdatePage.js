import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import TableComponent from "components/TableComponent";
import ContainerComponent from "components/AdminContainerComponent";

function productsUpdatePage({ history, location, match }) {
  const { id } = match.params;

  const { request, callBack, state } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const data = state.products.data.find((w) => w.id == id) || location.props;

  if (!data) {
    return (
      <ContainerComponent bread={[]}>
        <div className="card-panel">
          <p>Product Not Found</p>
        </div>
      </ContainerComponent>
    );
  }

  const nav = [
    {
      label: "Products",
      link: "/cp/products",
    },
    {
      label: data.name,
    },
  ];

  const formArray = [
    {
      id: "name",
    },
    {
      id: "price",
      type: "number",
    },
  ];

  const { items, ...order } = data;

  const initialState = {
    ...order,
  };

  const onSuccess = () => {
    history.goBack();
  };

  const onSubmit = async (body) => {
    callBack("/api/products", "", body, onSuccess, "PATCH");
  };

  return (
    <ContainerComponent bread={nav} title={data.expires_at}>
      <div className="row">
        <div className="col l4 s12">
          <div className="card-panel">
            <Form
              {...{
                formArray,
                fetching,
                errors,
                message,
                initialState,
                onSubmit,
              }}
            />
          </div>

          <br />
          <br />
        </div>
        <div className="col l7 offset-l1 s12">
          <div className="card-panel">
            <TableComponent data={order} />
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default productsUpdatePage;
