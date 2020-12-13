import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from "./searchTypes"

const initialeState = {
  loading: false,
  products: [],
  error: "",
}

export const searchReducer = (state = initialeState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SEARCH_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }
    case SEARCH_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
