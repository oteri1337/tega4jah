import React from "react";
import { Link } from "react-router-dom";
import AdminContainerComponent from "components/AdminContainerComponent";

function AdminHomePage() {
  return (
    <AdminContainerComponent pageTitle="Control Panel">
      <Link to="/cp/users">
        <div className="bg row">
          <div className="col l1">
            <span className="material-symbols-outlined notranslate ">
              power_settings_new
            </span>
          </div>
          <div className="col l9">
            <h6>Users</h6>
          </div>
        </div>
      </Link>

      <Link to="/cp/products">
        <div className="bg row">
          <div className="col l1">
            <span className="material-symbols-outlined notranslate ">
              power_settings_new
            </span>
          </div>
          <div className="col l9">
            <h6>Products</h6>
          </div>
        </div>
      </Link>
    </AdminContainerComponent>
  );
}

export default AdminHomePage;
