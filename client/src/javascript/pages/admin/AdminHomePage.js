import React from "react";
import { Link } from "react-router-dom";
import AdminContainerComponent from "components/AdminContainerComponent";

function AdminHomePage() {
  return (
    <AdminContainerComponent pageTitle="Control Panel">
      <Link to="/cp/products">
        <div className="bg row">
          <div className="col l1"></div>
          <div className="col l9">
            <h5>Products</h5>
            <br />
          </div>
        </div>
      </Link>
    </AdminContainerComponent>
  );
}

export default AdminHomePage;
