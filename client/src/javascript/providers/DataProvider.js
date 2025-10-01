import React from "react";
import { getRequest } from "functions";
import reducer from "../reducers/rootReducer";

export const DataContext = React.createContext({});

function AppProvider({ children, initialState }) {
  const [state, callReducer] = React.useReducer(reducer, initialState || {});

  // prettier-ignore
  React.useEffect(() => {
    const getBackendState = async () => {
      let response;


      response = await getRequest("/api/graph"); 
      if (response.settings) {
        callReducer({ dispatch: "UPDATE_GRAPH", data: response });
      }

  
    };

    getBackendState();
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem("data", JSON.stringify(state));
    } catch (e) {
      console.log("cant save to local storage ", e);
    }
  });

  const signOut = async () => {
    await getRequest("/api/users/auth/signout");
    callReducer({ dispatch: "UPDATE_USER", data: false });
  };

  const adminSignOut = async () => {
    await getRequest("/api/admins/auth/signout");
    callReducer({ dispatch: "UPDATE_ADMIN", data: false });
  };

  return (
    <DataContext.Provider value={{ state, callReducer, adminSignOut, signOut }}>
      {children}
    </DataContext.Provider>
  );
}

export default AppProvider;
