import React from "react";
import { Link } from "react-router-dom";
import { DataContext } from "providers/DataProvider";

function TourNavComponent() {
  const { state, callReducer } = React.useContext(DataContext);

  const renderLoginLinks = () => {
    if (state.user) {
      return (
        <>
          <li>
            <Link to="/user/home">Hello, {state.user.first_name}</Link>
          </li>
          <li>
            <Link to="/user/orders">Orders</Link>
          </li>
          ;
        </>
      );
    }

    return (
      <>
        {/* <li className="hide-on-med-and-down">
          <Link to="/signin">Customer Login</Link>
        </li>

        <li className="hide-on-med-and-down">
          <Link to="/signin">Staff Login</Link>
        </li> */}
      </>
    );
  };

  return (
    <div className="navbar-fixed">
      <nav>
        <div className=" nav-wrapper">
          <ul id="nav-mobile" className="left">
            <li>
              <Link to="/">
                <b className={`app-title `}>{NODE_NAME}</b>
              </Link>
            </li>
          </ul>
          <ul className="right">{renderLoginLinks()}</ul>
        </div>
      </nav>
    </div>
  );
}

export default TourNavComponent;
