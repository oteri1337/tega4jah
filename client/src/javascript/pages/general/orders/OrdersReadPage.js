import React from "react";
import NavComponent from "../container/NavComponent";
import { DataContext } from "providers/DataProvider";
import TableComponent from "components/TableComponent";

function OrdersReadPage({ match }) {
  const { id } = match.params;

  const { state } = React.useContext(DataContext);

  console.log(state.user.orders);

  const data = state.user.orders.data.find((w) => w.id == id);

  if (!data) {
    return <>not found</>;
  }

  const { items, ...order } = data;

  return (
    <>
      <NavComponent />
      <div className="container app-py-3">
        <div className="row bg">
          <div className="col l4"></div>
          <div className="col l8">
            <TableComponent data={order} />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersReadPage;
