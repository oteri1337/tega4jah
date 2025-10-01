import React from "react";
import { Link } from "react-router-dom";
import { getRequestThenDispatch } from "hooks";
import TableComponent from "components/TableComponent";
import ContainerComponent from "components/AdminContainerComponent";

const format = (amount, currency = "NGN") => {
  if (isNaN(amount)) {
    return amount;
  }

  if (amount === null) {
    return "";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

function ProductsReadPage({ location, match }) {
  const { id } = match.params;
  const dispatch = "UPDATE_PRODUCT";
  const { state } = getRequestThenDispatch(`/api/products/${id}`, dispatch);

  const product = state.products.data.find((p) => p.id == id) || location.props;

  if (!product) {
    return (
      <ContainerComponent bread={[]}>
        <div className="card-panel">
          <p>Not Found</p>
        </div>
      </ContainerComponent>
    );
  }

  product.price = format(product.price);

  const nav = [
    {
      label: "Products",
      link: "/cp/products",
    },
    {
      label: `${product.name}`,
    },
  ];

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="row">
          <div className="col l3 s12">
            <center>
              {/* <img src={`${product.image_one}`} className="responsive-img " />
              <br />
              <br /> */}

              <p>
                <Link to={{ pathname: `/cp/products/${id}/colors`, product }}>
                  Colors ({product.colors.data.length})
                </Link>
              </p>

              <p>
                <Link to={{ pathname: `/cp/products/${id}/update`, product }}>
                  Update
                </Link>
              </p>

              <br />
              <br />
            </center>
            <br />
          </div>

          <div className="col l9 s12">
            <TableComponent data={product} />
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default ProductsReadPage;
