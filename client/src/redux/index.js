import { combineReducers } from "redux"
import { userReducer } from "./user/userReducer"
import { searchReducer } from "./search/searchReducer"
import { cartReducer } from "./cart/cartReducer"

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
})

export * from "./user/userActions"
export * from "./user/actions"
export * from "./search/searchActions"
export * from "./search/actions"
export * from "./cart/cartActions"
export * from "./cart/actions"

export default rootReducer
