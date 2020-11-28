import { combineReducers } from "redux";
import { userReducer } from "./user/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export * from "./user/userActions";
export * from "./user/actions";
export default rootReducer;
