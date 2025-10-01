import React from "react";
import Router from "./routing/Router";
import { createRoot } from "react-dom/client";
import AppProvider from "./providers/DataProvider";
import reducer from "./reducers/rootReducer";

async function renderApp() {
  let data = await JSON.parse(localStorage.getItem("data"));
  data = reducer({}, { dispatch: "UPDATE_STATE", data });
  data = reducer(data, { dispatch: "UPDATE_THEME", data: data.theme });

  const documentRoot = document.querySelector("#root");
  const root = createRoot(documentRoot);

  root.render(
    <AppProvider initialState={data}>
      <Router />
    </AppProvider>
  );
}

renderApp();
