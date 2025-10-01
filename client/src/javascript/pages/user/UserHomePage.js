import React from "react";
import { Link } from "react-router-dom";
import { DataContext } from "providers/DataProvider";
import NavComponent from "../general/container/NavComponent";

function MenuLink({ to, icon, text, background = "#32a7e2", desc }) {
  return (
    <Link to={to} className="collection-item bg">
      <li>
        <div
          style={{
            background,
            padding: "1rem",
            marginRight: "1rem",
            borderRadius: "10px",
            display: "inline-block",
            paddingBottom: "0.8rem",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "30px", margin: 0, padding: 0, color: "white" }}
          >
            {icon}
          </span>
        </div>
        {text} <span style={{ color: "silver", fontSize: "12px" }}>{desc}</span>
      </li>
    </Link>
  );
}

function UserHomeComponent() {
  const { state, signOut } = React.useContext(DataContext);
  const { user } = state;

  return (
    <>
      <NavComponent />
      <div className="container app-pt-3">
        <center>
          <img
            src={`${user.photo_profile}`}
            className="circle"
            height="120px"
          />

          <h4>
            {user.first_name} {user.last_name}
          </h4>

          <br />

          <a onClick={signOut}>LOGOUT</a>
        </center>

        <br />
        <br />

        <ul className="collection">
          <MenuLink
            text="View Orders"
            icon="shopping_cart"
            to="/user/account/address"
            background="#22b07d"
          />

          <MenuLink
            text="Update Contacts"
            icon="location_on"
            to="/user/account/address"
            background="#22b0ff"
          />
        </ul>
      </div>
    </>
  );
}

export default UserHomeComponent;
