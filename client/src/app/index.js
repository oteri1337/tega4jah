import React from "react";
import { getRequestThenDispatch } from "hooks";
import ProductComponent from "../components/products/ProductComponent";

function ProductsListPage() {
  const dispatch = "UPDATE_PRODUCTS";

  const endpoint = `/api/products`;

  const { state } = getRequestThenDispatch(endpoint, dispatch);

  const products = state.products.data.map((product) => (
    <ProductComponent key={product.id} item={product} />
  ));

  return <div className="row">{products}</div>;
}

export default ProductsListPage;
