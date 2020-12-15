import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from "./searchTypes"

export const searchRequest = (query, type) => {
  return {
    type: SEARCH_REQUEST,
    payload: { query, type },
  }
}

export const searchSuccess = (products, query, type) => {
  return {
    type: SEARCH_SUCCESS,
    payload: { products, query, type },
  }
}

export const searchFailure = (error, query, type) => {
  return {
    type: SEARCH_FAILURE,
    payload: { error, query, type },
  }
}
