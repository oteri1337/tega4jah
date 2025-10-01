import React from "react";
import NavComponent from "./container/NavComponent";
import CartListComponent from "./cart/CartListComponent";
import ProductsListPage from "./products/ProductsListPage";
import WhatsAppButtonComponent from "../components/WhatsAppButtonComponent";

function HomePage() {
  return (
    <>
      <NavComponent />
      <div className="app-py-3">
        <div className="row">
          <br />
          <ProductsListPage />
          {/* <div className="col l3 offset-l1 app-px-1">
            <CartListComponent />
          </div> */}
        </div>

        <WhatsAppButtonComponent />
      </div>
    </>
  );
}

export default HomePage;
