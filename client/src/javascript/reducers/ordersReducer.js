const defaultState = { data: [], object: {}, search_keys: {} };

function ordersReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_ORDERS":
      return action.data;
    case "UPDATE_ORDER":
      return {
        ...state,
        object: {
          [action.data.id]: action.data,
        },
      };
    case "UPDATE_ORDERS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
      };
    default:
      return state;
  }
}

export default ordersReducer;
