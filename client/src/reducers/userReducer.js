export const userReducer = (
  state = {
    name: null,
    _id: null,
    role: null,
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
    default:
      return state;
  }
};
