import axios from "axios"
import { login, logout } from "../../api/auth"
import {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
} from "./userActions"
import {
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFailure,
} from "./userActions"
import ReactGa from "react-ga"

//? lOGIN ACTION:
export const loginUser = (userInfos) => {
  return async (dispatch) => {
    dispatch(loginUserRequest())
    ReactGa.event({
      category: "AUTH",
      action: "LOGGIN ATTEMPT",
    })
    try {
      await login(userInfos)
      const response = await axios.get("/api/user/me")
      dispatch(loginUserSuccess(response.data, true))
      ReactGa.event({
        category: "AUTH",
        action: "LOGGIN SUCCESS",
      })
    } catch (err) {
      dispatch(loginUserFailure(err.message))
      ReactGa.event({
        category: "AUTH",
        action: "LOGGIN FAILURE",
      })
    }
  }
}

//? LOGOUT ACTION
export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(logoutUserRequest())
    ReactGa.event({
      category: "AUTH",
      action: "LOGOUT ATTEMPT",
    })
    try {
      await logout()
      dispatch(logoutUserSuccess(false))
      ReactGa.event({
        category: "AUTH",
        action: "LOGOUT SUCCESS",
      })
    } catch (err) {
      dispatch(logoutUserFailure(err.message))
      ReactGa.event({
        category: "AUTH",
        action: "LOGOUT FAILURE",
      })
    }
  }
}
