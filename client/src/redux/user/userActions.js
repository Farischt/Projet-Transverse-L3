import { current } from "../../api/auth";
import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
} from "./userTypes";

//? LOGIN :
export const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST,
  };
};

export const loginUserSuccess = (user, isLoggedIn) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: { user, isLoggedIn },
  };
};

export const loginUserFailure = (error, isLoggedIn) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: { error, isLoggedIn },
  };
};

//? LOGOUT:
export const logoutUserRequest = () => {
  return {
    type: LOGOUT_USER_REQUEST,
  };
};

export const logoutUserSuccess = (isLoggedIn) => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: isLoggedIn,
  };
};

export const logoutUserFailure = (error) => {
  return {
    type: LOGOUT_USER_FAILURE,
    payload: error,
  };
};

//? CURRENT USER:
export const currentUser = () => {
  return async (dispatch) => {
    dispatch(loginUserRequest());
    try {
      const response = await current();
      dispatch(loginUserSuccess(response.data, true));
    } catch (err) {
      dispatch(loginUserFailure(err.message));
    }
  };
};
