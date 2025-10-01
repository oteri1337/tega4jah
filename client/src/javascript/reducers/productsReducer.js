const defaultState = { data: [], object: {}, search_keys: {} };

function productsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_PRODUCTS":
      return action.data;
    case "UPDATE_PRODUCT":
      return {
        ...state,
        object: {
          [action.data.id]: action.data,
        },
      };
    case "UPDATE_PRODUCTS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
      };
    default:
      return state;
  }
}

export default productsReducer;
