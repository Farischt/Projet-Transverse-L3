import { combineReducers } from "redux"
import { userReducer } from "./user/userReducer"
import { searchReducer } from "./search/searchReducer"

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
})

export * from "./search/searchActions"
export * from "./search/actions"
export * from "./user/userActions"
export * from "./user/actions"
export default rootReducer
