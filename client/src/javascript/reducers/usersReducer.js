const defaultState = { data: [], object: {}, search_keys: {} };

function usersReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_USERS":
      return action.data;

      case "UPDATE_USERS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
      };

    case "UPDATE_USER_IN_USERS":
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

export default usersReducer;
