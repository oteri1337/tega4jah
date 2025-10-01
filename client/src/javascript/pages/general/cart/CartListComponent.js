import React from "react";
import { useFetch } from "hooks";
import { format } from "functions";
import { useHistory } from "react-router-dom";
import FormComponent from "components/FormComponent";
import { DataContext } from "providers/DataProvider";

function CartListComponent() {
  const history = useHistory();
  const { fetching, request, response } = useFetch();
  const { errors, message } = response;

  const { state, callReducer } = React.useContext(DataContext);

  let total = 0;

  const ids = Object.keys(state.cart);

  const items = ids.map((id) => {
    const product = state.cart[id];

    total = total + parseFloat(product.price) * product.quantity;

    return (
      <tr key={id}>
        <td>{product.name}</td>
        <td>{format(product.price)}</td>
        <td>{product.quantity}</td>
      </tr>
    );
  });

  const onSubmit = async (body) => {
    body.total = total;
    body.items = JSON.stringify(state.cart);

    if (state.user) {
      body.city = state.user.city;
      body.user_id = state.user.id;
      body.email = state.user.email;
      body.street = state.user.street;
      body.province = state.user.province;
      body.last_name = state.user.last_name;
      body.first_name = state.user.first_name;
      body.phone_number = state.user.phone_number;
    }

    const method = "POST";
    const endpoint = "/api/orders";
    const response = await request({ endpoint, body, method });
    if (response.errors.length === 0) {
      callReducer({ dispatch: "EMPTY_CART" });
      history.push(`/orders/${response.data.id}`);
    }
  };

  const text = "PLACE ORDER";

  const renderAddress = () => {
    if (Object.keys(state.cart).length && state.user) {
      return (
        <>
          <center>
            <h2>DELIVER TO</h2>
            <br />
          </center>
          <div className="app-px-2">
            {state.user.first_name} {state.user.last_name} <br />
            <br />
            {state.user.street}
            <br />
            {state.user.city}, {state.user.province}
            <br />
            <br />
            {state.user.phone_number}
            <br />
            {state.user.email}
          </div>
        </>
      );
    }
  };

  return (
    <section className="bg app-px-1 app-py-2">
      <p>{Object.keys(state.cart).length} Items In Cart</p>
      <table className="striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
      <br />
      <br />
      <div className="row">
        {Object.keys(state.cart).length > 0 && (
          <div className="col s6">
            <a onClick={() => callReducer({ dispatch: "EMPTY_CART" })}>
              Clear Cart
            </a>
          </div>
        )}
        <div className="col s6" style={{ textAlign: "right" }}>
          Total: {format(total)}
        </div>
      </div>
      <br />
      <br />
      {Object.keys(state.cart).length > 0 && (
        <center>
          <FormComponent {...{ text, fetching, errors, message, onSubmit }} />
        </center>
      )}
      <br />
      {Object.keys(state.cart).length > 0 && (
        <center>
          <a className="btn btn-secondary">PRINT INVOICE</a>
        </center>
      )}
      <br />
      <br />
      <br />
      {renderAddress()}
    </section>
  );
}

export default CartListComponent;
