import React from "react";
import { Link } from "react-router-dom";
import { DataContext } from "providers/DataProvider";
import ThemeNavComponent2 from "./ThemeChangerNav2Component";

function AdminHeaderComponent({ fetching }) {
  const { adminSignOut } = React.useContext(DataContext);

  React.useLayoutEffect(() => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
  });

  return (
    <React.Fragment>
      <div className="app-primary-background">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <ul>
                <li>
                  <Link to="/cp/index">CONTROL PANEL</Link>
                </li>
              </ul>

              <ul id="nav-mobile" className="right">
                <li>
                  {fetching && (
                    <div className="preloader-wrapper small active">
                      <div className="spinner-layer spinner-green-only">
                        <div className="circle-clipper left">
                          <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                          <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                          <div className="circle"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                {/* <ThemeNavComponent2 /> */}

                <li>
                  <a onClick={adminSignOut} title="Sign Out">
                    <span className="material-symbols-outlined notranslate ">
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
