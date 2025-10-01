const defaultState = { data: [], object: {}, search_keys: {} };

function blocksReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_BLOCKS":
      return action.data;
    case "UPDATE_BLOCK":
      return {
        ...state,
        object: {
          [action.data.id]: action.data,
        },
      };
    case "UPDATE_BLOCKS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
      };
    default:
      return state;
  }
}

export default blocksReducer;
