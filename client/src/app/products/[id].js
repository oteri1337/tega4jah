import React from "react";
import currency from "../../functions/currency";
import ProductColorsComponent from "../../components/products/ProductColorsComponent";

function ProductReadPage({ match }) {
  const [product, setProduct] = React.useState(false);
  const [image, setImage] = React.useState("");

  const { id } = match.params;

  React.useEffect(() => {
    const getData = async () => {
      const url = `/api/products/${id}`;
      const response = await fetch(url);
      const json = await response.json();
      setProduct(json.data);
      setImage(json.data.colors.data[0].image);
    };
    getData();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg row">
      <center>
        <div className="col l4 offset-l4">
          <img
            src={image}
            alt={product.name}
            style={{ borderRadius: "10px" }}
            className="responsive-img"
          />

          <h4>{product.name}</h4>
          <p>{currency(product.price)}</p>

          <ProductColorsComponent colors={product.colors} setImage={setImage} />

          <br />
          <br />
          <a
            href={`https://wa.me/+2348169337785?text=hello, i would like to buy ${product.name} ${image}`}
            className="btn"
          >
            BUY
          </a>
          <br />
          <br />
        </div>
      </center>
    </div>
  );
}

export default ProductReadPage;
