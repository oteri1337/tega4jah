import React from "react";
import { getRequestThenDispatch } from "hooks";
import ListComponent from "components/ListComponent";

const format = (amount, currency = "NGN") => {
  if (amount === null) {
    return "";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

const ColorPicker = ({ colors, setImage }) => {
  return colors?.data?.map((color) => (
    <div
      key={color.id}
      onClick={() => setImage(color.image)}
      style={{
        margin: 5,
        width: 40,
        height: 40,
        cursor: "pointer",
        borderRadius: "50%",
        display: "inline-block",
        background: color.color_code,
      }}
    />
  ));
};

const ProductCard = ({ product }) => {
  const [image, setImage] = React.useState(product.colors.data[0].image);

  return (
    <div className="center col l3 s12" key={product.id}>
      <div style={{ background: "white" }}>
        <img
          src={image}
          alt={product.name}
          style={{ borderRadius: "10px" }}
          className="responsive-img"
        />

        <h4>{product.name}</h4>
        <p>{format(product.price)}</p>

        <ColorPicker colors={product.colors} setImage={setImage} />

        <br />
        <br />
        <button className="btn">BUY</button>
        <br />
        <br />
      </div>
      <br />
    </div>
  );
};

function ProductsListPage() {
  const dispatch = "UPDATE_PRODUCTS";

  const endpoint = `/api/products`;

  const { state } = getRequestThenDispatch(endpoint, dispatch);

  // const list = state.products;

  // const addToCart = (data) => {
  //   if (state.cart[data.id]) {
  //     callReducer({ dispatch: "INCREASE_QUANTITY", data: { id: data.id } });
  //   } else {
  //     callReducer({ dispatch: "ADD_TO_CART", data });
  //   }
  // };

  // const renderRemoveFromCart = (id) => {
  //   if (state.cart[id] && state.cart[id]?.quantity) {
  //     if (state.cart[id]?.quantity === 1) {
  //       return (
  //         <a
  //           onClick={() =>
  //             callReducer({ dispatch: "REMOVE_FROM_CART", data: { id } })
  //           }
  //         >
  //           <span className="material-symbols-outlined">
  //             remove_shopping_cart
  //           </span>
  //         </a>
  //       );
  //     }

  //     return (
  //       <a
  //         onClick={() =>
  //           callReducer({ dispatch: "DECREASE_QUANTITY", data: { id } })
  //         }
  //       >
  //         <span className="material-symbols-outlined">
  //           remove_shopping_cart
  //         </span>
  //       </a>
  //     );
  //   }
  // };

  // const renderColors = (colors, setImage) => {
  //   return colors?.data?.map((color) => (
  //     <div
  //       key={color.id}
  //       onClick={() => setImage(color.image)}
  //       style={{
  //         margin: 5,
  //         width: 40,
  //         height: 40,
  //         cursor: "pointer",
  //         borderRadius: "50%",
  //         display: "inline-block",
  //         background: color.color_code,
  //       }}
  //     ></div>
  //   ));
  // };

  return state.products.data.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
}

export default ProductsListPage;
