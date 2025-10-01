function adminReducer(state = false, action) {
  switch (action.dispatch) {
    case "UPDATE_GRAPH":
      return action.data.admin;
    case "UPDATE_ADMIN":
      return action.data;
    default:
      return state;
  }
}

export default adminReducer;
