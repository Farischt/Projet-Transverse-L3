import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { userThunkReducer } from "../redux/user/userReducer";

const rootReducer = combineReducers({
  user: userThunkReducer,
});

export default rootReducer;
