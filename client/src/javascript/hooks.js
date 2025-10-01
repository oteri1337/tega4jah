// difference between hooks and functions is hooks have state and functions do not
// i.e you can hook into its state and perform logic based on its state unlike functions
// hooks are like upgraded functions

import React from "react";
import { DataContext } from "./providers/DataProvider";
import { getRequest, sendRequest, sendFormRequest } from "./functions";

export function useDataProviderLiveTickers() {
  const { state, callReducer } = React.useContext(DataContext);

  React.useEffect(() => {
    const dataRef = window.project1.database().ref("data");

    dataRef.on("value", (s) => {
      callReducer({ dispatch: "UPDATE_TICKERS", data: s.val() });
    });

    return () => {
      dataRef.off();
    };
  }, []);

  return { state };
}

export function useFetch() {
  const { state, callReducer } = React.useContext(DataContext);
  const [response, setResponse] = React.useState({ errors: [], message: "" });
  const [fetching, setFetching] = React.useState(false);

  const request = async (props) => {
    const { endpoint = "", dispatch = "", method = "GET", body = [] } = props;
    setFetching(true);

    let json;

    if (method == "GET") {
      json = await getRequest(endpoint);
    }

    if (method != "GET") {
      json = await sendRequest(endpoint, body, method);
    }

    setResponse(json);
    setFetching(false);

    if (json.errors.length === 0 && dispatch.length) {
      callReducer({ dispatch, data: json.data });
    }

    return json;
  };

  return { state, fetching, response, request, callReducer };
}

export function getRequestThenDispatch(url, dispatch, prop) {
  const { state, callReducer } = React.useContext(DataContext);
  const [fetching, setFetching] = React.useState(true);
  const [response, setResponse] = React.useState({
    errors: [],
    message: "",
    data: {},
  });

  React.useEffect(() => {
    async function asyncOperation() {
      let endpoint = url;

      setFetching(true);
      const response = await getRequest(endpoint);

      if (response.status === "200") {
        if (response.errors.length === 0) {
          callReducer({ dispatch, data: response.data });
        }
      }

      if (response.status === "401") {
        if (response?.admin == false) {
          callReducer({ dispatch: "UPDATE_ADMIN", data: false });
        }
      }

      setFetching(false);
      setResponse(response);
    }
    asyncOperation();
  }, [url, prop]);

  return { state, fetching, response, callReducer };
}

export function sendRequestThenDispatch() {
  const { state, callReducer } = React.useContext(DataContext);
  const [request, setRequest] = React.useState({
    fetching: false,
    errors: [],
    message: "",
  });

  const callBack = async (url, dispatch, body, onSuccess, type = "POST") => {
    onSuccess = onSuccess || function () {};
    setRequest({
      fetching: true,
      errors: [],
      message: "",
    }); 
    try {
      const response = await sendRequest(url, body, type);

      if (response.status === "401") {
        if (response?.admin == false) {
          callReducer({ dispatch: "UPDATE_ADMIN", data: false });
        }

        if (response?.user == false) {
          callReducer({ dispatch: "UPDATE_USER", data: false });
        }
      }

      const { errors, data, message } = response;
      setRequest({
        fetching: false,
        errors,
        message,
      });
      if (errors.length === 0) {
        callReducer({ dispatch, data });
        onSuccess(data);
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    state,
    request,
    callBack,
    callReducer,
  };
}

export const getNavClassName = () => {
  const [className, setClassName] = React.useState("transparent");

  const eventListener = () => {
    if (scrollY === 0) {
      setClassName("transparent");
    } else {
      setClassName("");
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", eventListener);
    return () => {
      window.removeEventListener("scroll", eventListener);
    };
  }, []);

  return className;
};

export function useRequestAndDispatch() {
  const [fetching, setFetching] = React.useState(false);
  const { state, callReducer } = React.useContext(DataContext);

  const getRequestThenDispatch = async (url, dispatch) => {
    setFetching(true);
    const response = await getRequest(url);
    setFetching(false);
    if (response.errors.length === 0) {
      callReducer({ dispatch, data: response.data });
    }
  };

  return {
    fetching,
    callReducer,
    getRequestThenDispatch,
    state,
  };
}

export function sendFormRequestThenDispatch() {
  const { state, callReducer } = React.useContext(DataContext);
  const [request, setRequest] = React.useState({
    fetching: false,
    errors: [],
    message: "",
  });

  const callBack = async (url, dispatch, body, onSuccess, type = "POST") => {
    onSuccess = onSuccess || function () {};
    setRequest({
      fetching: true,
      errors: [],
      message: "",
    });
    const { errors, data, message } = await sendFormRequest(url, body, type);
    setRequest({
      fetching: false,
      errors,
      message,
    });
    if (errors.length === 0) {
      callReducer({ dispatch, data });
      onSuccess(data);
    }
  };

  return {
    state,
    request,
    callBack,
  };
}
