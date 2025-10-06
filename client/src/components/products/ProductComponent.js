import React from "react";
import { Link } from "react-router-dom";
import currency from "../../functions/currency";
import ProductColorsComponent from "./ProductColorsComponent";

export default function ({ item }) {
  const [image, setImage] = React.useState(item.colors.data[0].image);

  return (
    <div className="center col l3 s12" key={item.id}>
      <div style={{ background: "white" }}>
        <Link to={`/products/${item.id}`}>
          <img
            src={image}
            alt={item.name}
            style={{ borderRadius: "10px" }}
            className="responsive-img"
          />

          <h4 className="black-text">{item.name}</h4>
          <p className="grey-text">{currency(item.price)}</p>
        </Link>

        <ProductColorsComponent colors={item.colors} setImage={setImage} />

        <br />
        <br />
        {/* <a
          href={`https://wa.me/+2348169337785?text=hello, i would like to buy ${item.name} ${image}`}
          className="btn"
        >
          BUY
        </a> */}
        {/* <br />
        <br /> */}
      </div>
      <br />
    </div>
  );
}
