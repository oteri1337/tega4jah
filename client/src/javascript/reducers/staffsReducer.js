const defaultState = { data: [], object: {}, search_keys: {} };

function stafssReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_STAFFS":
      return action.data;

    case "UPDATE_STAFFS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
      };

    case "UPDATE_STAFF_IN_STAFFS":
      return {
        ...state,
        object: {
          ...state.object,
          [action.data.id]: action.data,
        },
      };

    default:
      return state;
  }
}

export default stafssReducer;
