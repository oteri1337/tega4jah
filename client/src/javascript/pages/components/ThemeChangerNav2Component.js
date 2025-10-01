import React from "react";
import { DataContext } from "providers/DataProvider";

function ThemeChangerNav2Component({ className = "" }) {
  const { state, callReducer } = React.useContext(DataContext);

  const changeTheme = (data) => {
    callReducer({ dispatch: "UPDATE_THEME", data });
  };

  if (state.theme.toUpperCase() == "LIGHT") {
    return (
      <li onClick={() => changeTheme("DARK")}>
        <span className={`material-symbols-outlined notranslate ${className}`}>
          dark_mode
        </span>
      </li>
    );
  }

  return (
    <li onClick={() => changeTheme("LIGHT")}>
      <span className={`material-symbols-outlined notranslate ${className}`}>
        light_mode
      </span>
    </li>
  );
}

export default ThemeChangerNav2Component;
