const defaultState = { data: [], object: {}, search_keys: {} };

function settingsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_GRAPH":
      return action.data.settings;
    case "UPDATE_SETTINGS":
      return action.data;
    default:
      return state;
  }
}

export default settingsReducer;
