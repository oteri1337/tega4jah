import React from "react";
import { Link } from "react-router-dom";
import { DataContext } from "providers/DataProvider";
import ThemeNavComponent2 from "../../components/ThemeChangerNav2Component";

function AdminHeaderComponent({ wallets = true }) {
  const { state, adminSignOut } = React.useContext(DataContext);

  React.useLayoutEffect(() => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
  });

  return (
    <React.Fragment>
      <div className="app-primary-background">
        <div className="navbar-fixed">
          <nav className="bg ">
            <div className="nav-wrapper">
              <ul>
                <li>
                  <Link to="/cp/home">CONTROL PANEL</Link>
                </li>
              </ul>

              <ul id="nav-mobile" className="right">
                <ThemeNavComponent2 />

                <li>
                  <a onClick={adminSignOut} title="Sign Out">
                    <span className="material-icons notranslate ">
                      power_settings_new
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AdminHeaderComponent;
