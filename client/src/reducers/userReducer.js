export const userReducer = (
  state = {
    name: null,
    _id: null,
    isLoggedIn: false,
    likedItems: null,
  },
  action
) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    case "LIKE":
      return action.payload;
    default:
      return state;
  }
};
