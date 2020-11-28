import axios from "axios";
import { login, logout } from "../../api/auth";
import {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
} from "./userActions";
import {
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFailure,
} from "./userActions";

//? lOGIN ACTION:
export const loginUser = (userInfos) => {
  return async (dispatch) => {
    dispatch(loginUserRequest());
    try {
      await login(userInfos);
      const response = await axios.get("/api/user/me");
      dispatch(loginUserSuccess(response.data, true));
    } catch (err) {
      dispatch(loginUserFailure(err.message));
    }
  };
};

//? LOGOUT ACTION
export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(logoutUserRequest());
    try {
      await logout();
      dispatch(logoutUserSuccess(false));
    } catch (err) {
      dispatch(logoutUserFailure(err.message));
    }
  };
};
