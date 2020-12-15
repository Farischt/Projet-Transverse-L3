import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from "./searchTypes"

const initialeState = {
  loading: false,
  products: [],
  error: "",
  query: "",
  type: "",
}

export const searchReducer = (state = initialeState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        query: action.payload.query,
        type: action.payload.type,
      }
    case SEARCH_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        query: action.payload.query,
        error: "",
        type: action.payload.type,
      }
    case SEARCH_FAILURE:
      return {
        loading: false,
        error: action.payload.error,
        query: action.payload.query,
        products: [],
        type: action.payload.type,
      }
    default:
      return state
  }
}
