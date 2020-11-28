const {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
} = require("./userTypes");

const initialeState = {
  loading: false,
  user: {},
  error: "",
  isLoggedIn: false,
};

export const userReducer = (state = initialeState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload.user,
        isLoggedIn: action.payload.isLoggedIn,
        error: "",
      };
    case LOGIN_USER_FAILURE:
      return {
        loading: false,
        user: {},
        error: action.payload.error,
        isLoggedIn: action.payload.isLoggedIn,
      };
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        user: {},
        isLoggedIn: action.payload,
        error: "",
      };
    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
