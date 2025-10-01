function toroThemeReducer(state = "LIGHT", action) {
  switch (action.dispatch) {
    case "UPDATE_THEME":
      const root = document.querySelector(":root");

      if (action.data == "light" || action.data == "LIGHT") {
        root.style.setProperty("--hover", "#dce2e4");

        root.style.setProperty("--nav-primary-font-colour", "black");
        root.style.setProperty("--nav-secondary-font-colour", "white");

        root.style.setProperty("--background-colour", "#f5f7fe");
        root.style.setProperty("--background-font-colour", "#4a4a4a");
        root.style.setProperty("--background-heading-colour", "#2C2C2C");

        root.style.setProperty("--primary-background", "#ffffff");
        root.style.setProperty("--primary-font-colour", "#777777");
        root.style.setProperty("--primary-border-colour", "#dbdcdf");
        root.style.setProperty("--primary-link-colour", "#000000");

        root.style.setProperty("--secondary-background", "#010121");
        root.style.setProperty("--secondary-font-colour", "#ffffff");
        root.style.setProperty("--secondary-heading-colour", "#ffffff");

        root.style.setProperty("--border-colour", "#f2f2f2");
      } else {
        root.style.setProperty("--hover", "#252b3c");

        root.style.setProperty("--nav-primary-font-colour", "white");
        root.style.setProperty("--nav-secondary-font-colour", "white");

        root.style.setProperty("--background-colour", "#000000");
        root.style.setProperty("--background-font-colour", "#a5bdd9");
        root.style.setProperty("--background-heading-colour", "#ffffff");

        root.style.setProperty("--primary-background", "#0b1118");
        root.style.setProperty("--primary-font-colour", "#ffffff");
        root.style.setProperty("--primary-border-colour", "#363c4e");
        root.style.setProperty("--primary-link-colour", "#FFFFFF");

        root.style.setProperty("--secondary-background", "#010121");
        root.style.setProperty("--secondary-font-colour", "#ffffff");
        root.style.setProperty("--secondary-heading-colour", "#ffffff");

        root.style.setProperty("--border-colour", "#434651");
      }
      return action.data;
    default:
      return state;
  }
}

export default toroThemeReducer;
