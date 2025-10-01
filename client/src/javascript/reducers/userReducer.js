function userReducer(state = false, action) {
  switch (action.dispatch) {
    case "UPDATE_GRAPH":
      return action.data.user;
    case "UPDATE_USER":
      return action.data;
    default:
      return state;
  }
}

export default userReducer;
