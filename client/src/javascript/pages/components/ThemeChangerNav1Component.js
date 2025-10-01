import React from "react";
import { DataContext } from "providers/DataProvider";

function ThemeChangerNav1Component({ className = "" }) {
  const dropref = React.useRef();
  const { callReducer } = React.useContext(DataContext);

  // React.useEffect(() => {
  //   var elements = document.querySelectorAll(".dropdown-trigger");
  //   M.Dropdown.init(elements, {
  //     hover: true,
  //     coverTrigger: false,
  //     constrainWidth: false,
  //   });
  // }, []);

  // const onClick = () => {
  //   const instance = M.Dropdown.getInstance(dropref.current);
  //   instance.open();
  // };

  const changeTheme = (data) => {
    callReducer({ dispatch: "UPDATE_THEME", data });
  };

  return (
    <React.Fragment>
      <li data-target="themer" className="dropdown-trigger">
        <a className={className}>THEME</a>
      </li>
      <ul id="themer" className="dropdown-content">
        <li>
          <a onClick={() => changeTheme("DARK")}>DARK</a>
        </li>

        <li>
          <a onClick={() => changeTheme("LIGHT")}>LIGHT</a>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default ThemeChangerNav1Component;
