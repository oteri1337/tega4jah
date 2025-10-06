import React from "react";
import Routes from "./routes";
import Router from "./routing/Router";
import reducer from "./reducers/rootReducer";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./providers/DataProvider";

async function renderApp() {
  let data = await JSON.parse(localStorage.getItem("data"));
  data = reducer({}, { dispatch: "UPDATE_STATE", data });
  data = reducer(data, { dispatch: "UPDATE_THEME", data: data.theme });

  const documentRoot = document.querySelector("#root");
  const root = createRoot(documentRoot);

  root.render(
    <AppProvider initialState={data}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppProvider>
  );
}

renderApp();
