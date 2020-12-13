import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from "./searchTypes"

export const searchRequest = () => {
  return {
    type: SEARCH_REQUEST,
  }
}

export const searchSuccess = (products) => {
  return {
    type: SEARCH_SUCCESS,
    payload: products,
  }
}

export const searchFailure = (error) => {
  return {
    type: SEARCH_FAILURE,
    payload: error,
  }
}
