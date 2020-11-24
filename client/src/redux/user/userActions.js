import axios from "axios";
import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
} from "./userTypes";

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

export const loginUser = (userInfos) => {
  return async (dispatch) => {
    dispatch(loginUserRequest);
    try {
      await axios.post("/api/user/login", userInfos);
      const response = await axios.get("/api/user/me");
      dispatch(loginUserSuccess(response.data, true));
    } catch (err) {
      dispatch(loginUserFailure(err.message));
    }
  };
};

export const currentUser = () => {
  return async (dispatch) => {
    dispatch(loginUserRequest);
    try {
      const response = await axios.get("/api/user/me");
      dispatch(loginUserSuccess(response.data, true));
    } catch (err) {
      dispatch(loginUserFailure(err.message));
    }
  };
};
