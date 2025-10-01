import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import usersReducer from "./usersReducer";
import adminReducer from "./adminReducer";
import themeReducer from "./themeReducer";
import staffsReducer from "./staffsReducer";
import blocksReducer from "./blocksReducer";
import ordersReducer from "./ordersReducer";
import settingsReducer from "./settingsReducer";
import productsReducer from "./productsReducer";

function rootReducer(state = {}, action) {
  if (action.dispatch == "UPDATE_STATE") {
    if (action.data) {
      return action.data;
    }
  }

  return {
    user: userReducer(state.user, action),
    cart: cartReducer(state.cart, action),
    users: usersReducer(state.users, action),
    theme: themeReducer(state.theme, action),
    admin: adminReducer(state.admin, action),
    staffs: staffsReducer(state.staffs, action),
    blocks: blocksReducer(state.blocks, action),
    orders: ordersReducer(state.orders, action),
    settings: settingsReducer(state.settings, action),
    products: productsReducer(state.products, action),
  };
}

export default rootReducer;
